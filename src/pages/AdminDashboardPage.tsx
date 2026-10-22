import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { Loader2, LogOut, Pencil, Plus, Trash2, UploadCloud, X } from 'lucide-react';
import type { Cake } from '@/config/siteConfig';
import { supabase, isSupabaseReady } from '@/lib/supabase';

interface ProductFormState {
  name: string;
  description: string;
  category: string;
  image: string;
  featured: boolean;
  is_available: boolean;
  sizes: string;
  flavours: string;
}

const blankForm: ProductFormState = {
  name: '',
  description: '',
  category: 'birthday',
  image: '',
  featured: false,
  is_available: true,
  sizes: JSON.stringify(
    [
      { label: 'Small', weight: '1 lb', price: 2200 },
      { label: 'Medium', weight: '2 lb', price: 3800 },
      { label: 'Large', weight: '3 lb', price: 5200 },
    ],
    null,
    2
  ),
  flavours: JSON.stringify(
    [{ id: 'vanilla', label: 'Vanilla Sponge' }],
    null,
    2
  ),
};

function parseJsonArray(value: string, fieldName: string): unknown[] {
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      throw new Error(`${fieldName} must be a JSON array.`);
    }
    return parsed;
  } catch (error) {
    throw new Error(`${fieldName} must be valid JSON. ${error instanceof Error ? error.message : ''}`.trim());
  }
}

function mapFromRow(row: any): Cake {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    category: row.category,
    image: row.image || 'https://images.pexels.com/photos/10249461/pexels-photo-10249461.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    sizes: Array.isArray(row.sizes) ? row.sizes : [],
    flavours: Array.isArray(row.flavours) ? row.flavours : [],
    featured: Boolean(row.featured),
    is_available: Boolean(row.is_available),
  };
}

export default function AdminDashboardPage() {
  const [isReady, setIsReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [products, setProducts] = useState<Cake[]>([]);
  const [form, setForm] = useState<ProductFormState>(blankForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const productCount = useMemo(() => products.length, [products]);

  const loadProducts = async () => {
    if (!supabase) {
      setIsReady(false);
      return;
    }

    const { data, error: fetchError } = await supabase.from('cakes').select('*').order('created_at', { ascending: false });
    if (fetchError) {
      setError(fetchError.message);
      return;
    }

    setProducts((data ?? []).map(mapFromRow));
  };

  const verifyAdminAccess = async () => {
    if (!supabase) {
      setIsAdmin(false);
      setCheckingAccess(false);
      setIsReady(false);
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      setIsAdmin(false);
      setCheckingAccess(false);
      setIsReady(false);
      window.history.pushState({}, '', '/admin');
      window.dispatchEvent(new PopStateEvent('popstate'));
      return;
    }

    const { data: adminRecord, error: adminError } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', session.user.id)
      .maybeSingle();

    if (adminError) {
      setError(adminError.message);
      setIsAdmin(false);
      setCheckingAccess(false);
      setIsReady(false);
      return;
    }

    const allowed = Boolean(adminRecord);
    setIsAdmin(allowed);
    setCheckingAccess(false);
    setIsReady(allowed);

    if (allowed) {
      await loadProducts();
    }
  };

  useEffect(() => {
    const setup = async () => {
      if (!isSupabaseReady()) {
        setError('Supabase is not configured. Add your environment variables before signing in.');
        setCheckingAccess(false);
        setIsReady(false);
        return;
      }

      await verifyAdminAccess();
    };

    void setup();

    if (!supabase) return;

    const subscription = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setIsAdmin(false);
        setCheckingAccess(false);
        setIsReady(false);
        window.history.pushState({}, '', '/admin');
        window.dispatchEvent(new PopStateEvent('popstate'));
        return;
      }

      void verifyAdminAccess();
    });

    return () => {
      subscription.data.subscription.unsubscribe();
    };
  }, []);

  const resetForm = () => {
    setForm(blankForm);
    setEditingId(null);
    setImageFile(null);
  };

  const handleUpload = async () => {
    if (!imageFile || !supabase) return '';

    const extension = imageFile.name.split('.').pop() || 'png';
    const fileName = `cakes/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;

    setUploading(true);

    const { error: uploadError } = await supabase.storage.from('cake-images').upload(fileName, imageFile, {
      cacheControl: '3600',
      upsert: false,
    });

    setUploading(false);

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage.from('cake-images').getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!supabase) {
      setError('Supabase is not configured.');
      return;
    }

    try {
      setSaving(true);
      setError('');
      setSuccess('');

      const nextSizes = parseJsonArray(form.sizes, 'sizes');
      const nextFlavours = parseJsonArray(form.flavours, 'flavours');

      const imageUrl = imageFile ? await handleUpload() : form.image;

      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        category: form.category,
        image: imageUrl || 'https://images.pexels.com/photos/10249461/pexels-photo-10249461.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        featured: form.featured,
        is_available: form.is_available,
        sizes: nextSizes,
        flavours: nextFlavours,
      };

      if (editingId) {
        const { error: updateError } = await supabase.from('cakes').update(payload).eq('id', editingId);
        if (updateError) throw updateError;
        setSuccess('Cake updated successfully.');
      } else {
        const { error: insertError } = await supabase.from('cakes').insert(payload);
        if (insertError) throw insertError;
        setSuccess('Cake created successfully.');
      }

      resetForm();
      await loadProducts();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Failed to save cake.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (cakeId: string) => {
    if (!supabase) return;

    const confirmed = window.confirm('Delete this cake from the product catalogue?');
    if (!confirmed) return;

    const { error } = await supabase.from('cakes').delete().eq('id', cakeId);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess('Cake deleted successfully.');
    await loadProducts();
  };

  const handleToggleAvailable = async (cake: Cake) => {
    if (!supabase) return;

    const nextState = !Boolean(cake.is_available);
    const { error } = await supabase.from('cakes').update({ is_available: nextState }).eq('id', cake.id);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(`Cake marked ${nextState ? 'available' : 'unavailable'}.`);
    await loadProducts();
  };

  const handleEdit = (cake: Cake) => {
    setEditingId(cake.id);
    setForm({
      name: cake.name,
      description: cake.description,
      category: cake.category,
      image: cake.image,
      featured: Boolean(cake.featured),
      is_available: Boolean(cake.is_available),
      sizes: JSON.stringify(cake.sizes, null, 2),
      flavours: JSON.stringify(cake.flavours, null, 2),
    });
    setError('');
    setSuccess('');
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setImageFile(file);
  };

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    window.history.pushState({}, '', '/admin');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  if (checkingAccess) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-cocoa-700">
          <Loader2 className="h-5 w-5 animate-spin" />
          Checking admin access...
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-lg rounded-3xl border border-cream-200 bg-white p-8 text-center shadow-lg">
          <h1 className="font-display text-3xl text-cocoa-700">Admin Access Required</h1>
          <p className="mt-4 text-cocoa-600">
            Only a user assigned in the Supabase admin_users table can access this dashboard.
          </p>
          <button
            onClick={() => {
              window.history.pushState({}, '', '/admin');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="mt-6 inline-flex rounded-full bg-cocoa-700 px-5 py-3 text-sm font-medium text-cream-50"
          >
            Back to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-cocoa-800 px-6 py-5 text-cream-50 shadow-lg md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cream-300">Zain Cake</p>
            <h1 className="mt-2 font-display text-3xl">Admin Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-cream-50/10 px-3 py-1 text-sm text-cream-100">
              {productCount} products
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full bg-cream-50 px-4 py-2 text-sm font-medium text-cocoa-700"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_2fr]">
          <form onSubmit={handleSubmit} className="rounded-3xl border border-cream-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-2xl text-cocoa-700">
                {editingId ? 'Edit product' : 'Add product'}
              </h2>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center gap-2 text-sm text-cocoa-600"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-cocoa-700">Cake name</label>
                <input
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="w-full rounded-xl border border-cream-300 bg-cream-50 px-3 py-2.5 text-cocoa-700 outline-none focus:border-cocoa-400"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-cocoa-700">Description</label>
                <textarea
                  value={form.description}
                  onChange={(event) => setForm({ ...form, description: event.target.value })}
                  rows={4}
                  className="w-full rounded-xl border border-cream-300 bg-cream-50 px-3 py-2.5 text-cocoa-700 outline-none focus:border-cocoa-400"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-cocoa-700">Category</label>
                <select
                  value={form.category}
                  onChange={(event) => setForm({ ...form, category: event.target.value })}
                  className="w-full rounded-xl border border-cream-300 bg-cream-50 px-3 py-2.5 text-cocoa-700 outline-none focus:border-cocoa-400"
                >
                  <option value="birthday">Birthday</option>
                  <option value="chocolate">Chocolate</option>
                  <option value="wedding">Wedding</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-cocoa-700">Image URL</label>
                <input
                  value={form.image}
                  onChange={(event) => setForm({ ...form, image: event.target.value })}
                  className="w-full rounded-xl border border-cream-300 bg-cream-50 px-3 py-2.5 text-cocoa-700 outline-none focus:border-cocoa-400"
                  placeholder="https://example.com/product.jpg"
                />
              </div>

              <div className="rounded-xl border border-dashed border-cream-300 bg-cream-50 p-3">
                <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-cocoa-700">
                  <UploadCloud className="h-4 w-4" />
                  Upload image to Supabase Storage
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
                {imageFile && <p className="mt-2 text-xs text-cocoa-500">Selected: {imageFile.name}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-cocoa-700">Sizes (JSON array)</label>
                <textarea
                  value={form.sizes}
                  onChange={(event) => setForm({ ...form, sizes: event.target.value })}
                  rows={8}
                  className="w-full rounded-xl border border-cream-300 bg-cream-50 px-3 py-2.5 font-mono text-xs text-cocoa-700 outline-none focus:border-cocoa-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-cocoa-700">Flavours (JSON array)</label>
                <textarea
                  value={form.flavours}
                  onChange={(event) => setForm({ ...form, flavours: event.target.value })}
                  rows={6}
                  className="w-full rounded-xl border border-cream-300 bg-cream-50 px-3 py-2.5 font-mono text-xs text-cocoa-700 outline-none focus:border-cocoa-400"
                />
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <label className="inline-flex items-center gap-2 text-sm text-cocoa-700">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(event) => setForm({ ...form, featured: event.target.checked })}
                  />
                  Featured
                </label>

                <label className="inline-flex items-center gap-2 text-sm text-cocoa-700">
                  <input
                    type="checkbox"
                    checked={form.is_available}
                    onChange={(event) => setForm({ ...form, is_available: event.target.checked })}
                  />
                  Available
                </label>
              </div>
            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={saving || uploading}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cocoa-700 px-4 py-3 text-sm font-medium text-cream-50 hover:bg-cocoa-600 disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : editingId ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {saving ? 'Saving...' : editingId ? 'Update cake' : 'Add cake'}
            </button>
          </form>

          <div className="rounded-3xl border border-cream-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-2xl text-cocoa-700">Catalogue</h2>
              <span className="rounded-full bg-cream-100 px-3 py-1 text-xs font-medium text-cocoa-600">
                {products.filter((product) => product.id).length} items
              </span>
            </div>

            <div className="space-y-4">
              {products.map((cake) => (
                <div key={cake.id} className="rounded-2xl border border-cream-200 bg-cream-50 p-3">
                  <div className="flex gap-4">
                    <img src={cake.image} alt={cake.name} className="h-20 w-20 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-display text-xl text-cocoa-700">{cake.name}</h3>
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] ${
                            cake.is_available ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {cake.is_available ? 'Available' : 'Hidden'}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-cocoa-600 line-clamp-2">{cake.description}</p>

                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                        <span className="rounded-full bg-cocoa-100 px-2 py-1 text-cocoa-700">
                          {cake.category}
                        </span>
                        <span
                          className={`rounded-full px-2 py-1 ${
                            cake.is_available ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {cake.is_available ? 'Visible' : 'Hidden'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(cake)}
                      className="inline-flex items-center gap-2 rounded-full bg-cocoa-700 px-3 py-2 text-xs font-medium text-cream-50"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleAvailable(cake)}
                      className="inline-flex items-center gap-2 rounded-full border border-cocoa-300 bg-white px-3 py-2 text-xs font-medium text-cocoa-700"
                    >
                      {cake.is_available ? 'Mark unavailable' : 'Mark available'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(cake.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
