import { useEffect, useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { ShoppingCart, CreditCard, Brush, Check, ArrowRight, Mail, Phone } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function formatCurrency(n){
  try { return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(n) } catch { return `Rp ${n}` }
}

function Navbar(){
  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/60 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-slate-800">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 shadow-inner" />
          <span>BlueStudio</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <a href="#catalog" className="hover:text-slate-900">Produk</a>
          <a href="#services" className="hover:text-slate-900">Jasa Desain</a>
          <a href="#order" className="hover:text-slate-900">Pesan</a>
        </div>
        <a href="#order" className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm shadow hover:bg-slate-800">
          <ShoppingCart size={18}/> Pesan Sekarang
        </a>
      </div>
    </div>
  )
}

function Hero(){
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-transparent to-cyan-50 pointer-events-none" />
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 pb-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-white/30 rounded-full px-3 py-1 text-xs text-slate-600 shadow-sm">
            <CreditCard size={14}/> Transaksi aman & cepat
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            Beli Produk Cetak & Jasa Desain dengan Nuansa Futuristik
          </h1>
          <p className="mt-4 text-slate-600 md:text-lg">
            Pilih produk cetak atau ajukan pembuatan desain profesional. Tampilan modern, transaksinya simple.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#catalog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white shadow hover:bg-slate-800">
              Jelajahi Katalog <ArrowRight size={18}/>
            </a>
            <a href="#services" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-800 shadow-sm hover:bg-slate-50">
              <Brush size={18}/> Jasa Desain
            </a>
          </div>
          <div className="mt-6 flex items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-1"><Check className="text-emerald-500" size={16}/> Garansi revisi</div>
            <div className="flex items-center gap-1"><Check className="text-emerald-500" size={16}/> Pembayaran aman</div>
            <div className="flex items-center gap-1"><Check className="text-emerald-500" size={16}/> Support cepat</div>
          </div>
        </div>
        <div />
      </div>
    </section>
  )
}

function Catalog(){
  const [products, setProducts] = useState([])
  useEffect(()=>{ fetch(`${API_BASE}/api/products`).then(r=>r.json()).then(setProducts).catch(()=>setProducts([])) },[])

  return (
    <section id="catalog" className="relative py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Katalog Produk</h2>
            <p className="text-slate-600">Pilih produk cetak favorit Anda</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p)=> (
            <div key={p.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video bg-slate-100 overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"/>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-slate-900">{p.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-2">{p.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-semibold text-indigo-600">{formatCurrency(p.price)}</span>
                  <AddToOrder item={{ type: 'product', title: p.title, price: p.price }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services(){
  const [services, setServices] = useState([])
  useEffect(()=>{ fetch(`${API_BASE}/api/services`).then(r=>r.json()).then(setServices).catch(()=>setServices([])) },[])

  return (
    <section id="services" className="relative py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Jasa Desain</h2>
          <p className="text-slate-600">Popular services untuk brand Anda</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s)=> (
            <div key={s.id} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-900">{s.name}</h3>
                  <p className="text-sm text-slate-600">{s.description}</p>
                </div>
                <Brush className="text-indigo-500" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-semibold text-indigo-600">Mulai {formatCurrency(s.base_price)}</span>
                <AddToOrder item={{ type: 'service', title: s.name, price: s.base_price }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AddToOrder({ item }){
  const { add } = useOrder()
  return (
    <button onClick={()=>add(item)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-500">
      <ShoppingCart size={16}/> Tambah
    </button>
  )
}

const OrderContext = (function(){
  const subs = new Set()
  let state = { items: [], total: 0 }
  function notify(){ subs.forEach(fn=>fn(state)) }
  function add(item){
    const existing = state.items.find(i=>i.title===item.title && i.type===item.type)
    if(existing){ existing.quantity += 1; existing.subtotal = existing.quantity*existing.price }
    else { state.items.push({ ...item, quantity:1, subtotal:item.price }) }
    state.total = state.items.reduce((a,b)=>a+b.subtotal,0)
    notify()
  }
  function remove(title){
    state.items = state.items.filter(i=>i.title!==title)
    state.total = state.items.reduce((a,b)=>a+b.subtotal,0)
    notify()
  }
  function update(title, qty){
    const it = state.items.find(i=>i.title===title)
    if(it){ it.quantity = Math.max(1, qty); it.subtotal = it.quantity*it.price; state.total = state.items.reduce((a,b)=>a+b.subtotal,0); notify() }
  }
  function subscribe(fn){ subs.add(fn); fn(state); return ()=>subs.delete(fn) }
  function clear(){ state = { items:[], total:0 }; notify() }
  return { add, remove, update, subscribe, clear }
})()

function useOrder(){
  const [s, setS] = useState(OrderContext.get ? OrderContext.get() : {items:[], total:0})
  useEffect(()=> OrderContext.subscribe(setS), [])
  return {
    items: s.items || [],
    total: s.total || 0,
    add: OrderContext.add,
    remove: OrderContext.remove,
    update: OrderContext.update,
    clear: OrderContext.clear
  }
}

function OrderPanel(){
  const { items, total, remove, update, clear } = useOrder()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const canCheckout = items.length>0 && name && email

  async function checkout(){
    if(!canCheckout) return
    setLoading(true)
    try{
      const payload = {
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        items: items.map(i=>({ product_id: '', title: i.title, quantity: i.quantity, price: i.price, subtotal: i.subtotal })),
        total,
        status: 'pending',
        notes: ''
      }
      const res = await fetch(`${API_BASE}/api/orders`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
      const data = await res.json()
      if(res.ok){
        alert('Pesanan berhasil dibuat! ID: '+data.id)
        clear(); setOpen(false)
      } else {
        alert('Gagal membuat pesanan: '+(data.detail||'Unknown error'))
      }
    }catch(e){
      alert('Terjadi kesalahan jaringan')
    }finally{ setLoading(false) }
  }

  return (
    <section id="order" className="sticky bottom-4 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingCart className="text-indigo-600"/>
              <div className="text-sm"><span className="font-semibold">{items.length}</span> item | <span className="font-semibold text-indigo-600">{formatCurrency(total)}</span></div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={()=>setOpen(!open)} className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm hover:bg-slate-50">{open?'Tutup':'Lihat Keranjang'}</button>
              <a href="#order-form" className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm hover:bg-slate-800">Checkout</a>
            </div>
          </div>
          {open && (
            <div className="mt-4 grid gap-3">
              {items.map(i=> (
                <div key={i.title} className="flex items-center justify-between text-sm">
                  <div className="font-medium text-slate-800">{i.title}</div>
                  <div className="flex items-center gap-2">
                    <input type="number" min={1} value={i.quantity} onChange={e=>update(i.title, Number(e.target.value))} className="w-16 rounded-md border-slate-200"/>
                    <div className="w-24 text-right">{formatCurrency(i.subtotal)}</div>
                    <button onClick={()=>remove(i.title)} className="text-red-500 hover:underline">Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div id="order-form" className="mt-4 grid md:grid-cols-3 gap-3">
            <input placeholder="Nama" className="rounded-lg border border-slate-200 px-3 py-2" value={name} onChange={e=>setName(e.target.value)}/>
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2"><Mail size={16}/><input placeholder="Email" className="w-full outline-none" value={email} onChange={e=>setEmail(e.target.value)}/></div>
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2"><Phone size={16}/><input placeholder="No. HP (opsional)" className="w-full outline-none" value={phone} onChange={e=>setPhone(e.target.value)}/></div>
            <button disabled={!canCheckout||loading} onClick={checkout} className="md:col-span-3 mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold shadow hover:from-indigo-500 hover:to-cyan-500 disabled:opacity-50">
              <CreditCard size={18}/> {loading?'Memproses...':'Buat Pesanan'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer(){
  return (
    <footer className="mt-20 py-10 bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 font-semibold text-white">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400" />
            BlueStudio
          </div>
          <p className="mt-3 text-sm text-slate-400">Solusi cetak dan desain modern dengan sentuhan futuristik.</p>
        </div>
        <div>
          <div className="font-semibold text-white mb-2">Kontak</div>
          <div className="text-sm">Email: hello@bluestudio.id</div>
          <div className="text-sm">Instagram: @bluestudio</div>
        </div>
        <div>
          <div className="font-semibold text-white mb-2">Dukungan</div>
          <div className="text-sm">Kebijakan Privasi</div>
          <div className="text-sm">Syarat & Ketentuan</div>
        </div>
      </div>
    </footer>
  )
}

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <Hero/>
      <Catalog/>
      <Services/>
      <OrderPanel/>
      <Footer/>
    </div>
  )
}
