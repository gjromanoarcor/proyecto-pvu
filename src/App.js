import { useState, useEffect, useRef } from "react";
import React from "react";

// ─── FUENTE ──────────────────────────────────────────────────────────────────
const _rf = document.createElement("link");
_rf.rel = "stylesheet";
_rf.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700;800&display=swap";
document.head.appendChild(_rf);

// ─── USUARIOS ────────────────────────────────────────────────────────────────
const USUARIOS = [
  { usuario:"admin",        password:"pvu2026",  nombre:"Administrador",      mail:"gjromano@arcor.com",        rol:"admin" },
  { usuario:"operaciones",  password:"ops123",   nombre:"Equipo Operaciones",  mail:"operaciones@tokin.com.ar",  rol:"ops"   },
  { usuario:"comunicacion", password:"com123",   nombre:"Equipo Comunicación", mail:"comunicacion@tokin.com.ar", rol:"comms" },
  { usuario:"promociones",  password:"promo123", nombre:"Equipo Promociones",  mail:"promociones@tokin.com.ar",  rol:"promo" },
];

// ─── COLORES ──────────────────────────────────────────────────────────────────
const AZUL = "#1E6FD9";
const NEGOCIO_COL = {
  "Alimentos":  { bg:"#e0f2fe", border:"#0ea5e9", text:"#0369a1" },
  "Helados":    { bg:"#ede9fe", border:"#8b5cf6", text:"#6d28d9" },
  "Harinas":    { bg:"#ffedd5", border:"#f97316", text:"#9a3412" },
  "Golosinas":  { bg:"#fef9c3", border:"#eab308", text:"#854d0e" },
  "Chocolates": { bg:"#fce7f3", border:"#ec4899", text:"#9d174d" },
};
const ESPACIO_COL = {
  "Landing Pages":   { bg:"#f0fdf4", border:"#16a34a", text:"#166534" },
  "Pop Up":          { bg:"#fce7f3", border:"#ec4899", text:"#9d174d" },
  "Banner Hero":     { bg:"#ffedd5", border:"#f97316", text:"#9a3412" },
  "Banner Search":   { bg:"#d1fae5", border:"#10b981", text:"#065f46" },
  "Banner Cart":     { bg:"#e0f2fe", border:"#38bdf8", text:"#075985" },
  "Banner Novedades":{ bg:"#f1f5f9", border:"#64748b", text:"#334155" },
  "Top Bar":         { bg:"#fdf2f8", border:"#d946ef", text:"#86198f" },
};

// ─── DATOS MOCK PROMOCIONES ACTIVAS ──────────────────────────────────────────
const PROMOS_ACTIVAS = [
  { id:"PROMO-001", nombre:"2x1 Traviata Porteñitas",    negocio:"Harinas",    tipo:"Más por Menos", subtipo:"2x1",         audienciaId:"AUD-0045", inicio:"2026-07-01", fin:"2026-07-15", unidades:28640, bultos:952,  kilos:2748, adminUrl:"https://admin.tokintienda.com/tokinAdmin/front/promotions/PROMO-001" },
  { id:"PROMO-002", nombre:"15% OFF Cofler Rellenas",    negocio:"Chocolates", tipo:"Regular",       subtipo:"Descuento %", audienciaId:"AUD-0012", inicio:"2026-07-01", fin:"2026-07-31", unidades:43200, bultos:1600, kilos:3715, adminUrl:"https://admin.tokintienda.com/tokinAdmin/front/promotions/PROMO-002" },
  { id:"PROMO-003", nombre:"20% Saladix Papa",           negocio:"Alimentos",  tipo:"Regular",       subtipo:"Descuento %", audienciaId:"AUD-0078", inicio:"2026-07-05", fin:"2026-07-20", unidades:38400, bultos:1600, kilos:3072, adminUrl:"https://admin.tokintienda.com/tokinAdmin/front/promotions/PROMO-003" },
  { id:"PROMO-004", nombre:"2x1 Mogul Masti",            negocio:"Golosinas",  tipo:"Más por Menos", subtipo:"2x1",         audienciaId:"AUD-0034", inicio:"2026-07-01", fin:"2026-07-31", unidades:67000, bultos:2790, kilos:4020, adminUrl:"https://admin.tokintienda.com/tokinAdmin/front/promotions/PROMO-004" },
  { id:"PROMO-005", nombre:"10% Barritas Águila",        negocio:"Helados",    tipo:"Regular",       subtipo:"Descuento %", audienciaId:"AUD-0091", inicio:"2026-07-08", fin:"2026-07-10", unidades:8900,  bultos:420,  kilos:980,  adminUrl:"https://admin.tokintienda.com/tokinAdmin/front/promotions/PROMO-005" },
  { id:"PROMO-006", nombre:"Progresiva Alfajores",       negocio:"Golosinas",  tipo:"Progresiva",    subtipo:"10u→20%",     audienciaId:"AUD-0056", inicio:"2026-07-10", fin:"2026-07-25", unidades:0,     bultos:0,    kilos:0,    adminUrl:"https://admin.tokintienda.com/tokinAdmin/front/promotions/PROMO-006" },
  { id:"PROMO-007", nombre:"15% OFF Chocolates Águila",  negocio:"Chocolates", tipo:"Regular",       subtipo:"Descuento %", audienciaId:"AUD-0023", inicio:"2026-07-01", fin:"2026-07-15", unidades:19800, bultos:825,  kilos:1683, adminUrl:"https://admin.tokintienda.com/tokinAdmin/front/promotions/PROMO-007" },
  { id:"PROMO-008", nombre:"4x3 Agua Mineral",           negocio:"Alimentos",  tipo:"Más por Menos", subtipo:"4x3",         audienciaId:"AUD-0067", inicio:"2026-07-15", fin:"2026-07-31", unidades:0,     bultos:0,    kilos:0,    adminUrl:"https://admin.tokintienda.com/tokinAdmin/front/promotions/PROMO-008" },
];

// ─── DATOS MOCK PROMOCIONES HISTORIAL ────────────────────────────────────────
const PROMOS_HISTORIAL = [
  { id:"PROMO-H001", nombre:"2x1 Traviata Porteñitas Mayo",   negocio:"Harinas",    tipo:"Más por Menos", subtipo:"2x1",         audienciaId:"AUD-0045", inicio:"2026-05-01", fin:"2026-05-31", unidades:28640, bultos:952,  kilos:2748, adminUrl:"https://admin.tokintienda.com/tokinAdmin/front/promotions/PROMO-H001" },
  { id:"PROMO-H002", nombre:"15% OFF Cofler Rellenas Mayo",   negocio:"Chocolates", tipo:"Regular",       subtipo:"Descuento %", audienciaId:"AUD-0012", inicio:"2026-05-01", fin:"2026-05-31", unidades:43200, bultos:1600, kilos:3715, adminUrl:"https://admin.tokintienda.com/tokinAdmin/front/promotions/PROMO-H002" },
  { id:"PROMO-H003", nombre:"Progresiva Galletitas",          negocio:"Alimentos",  tipo:"Progresiva",    subtipo:"10u→10%",     audienciaId:"AUD-0078", inicio:"2026-05-15", fin:"2026-06-01", unidades:8900,  bultos:420,  kilos:980,  adminUrl:"https://admin.tokintienda.com/tokinAdmin/front/promotions/PROMO-H003" },
  { id:"PROMO-H004", nombre:"3x2 Jugos",                      negocio:"Alimentos",  tipo:"Más por Menos", subtipo:"3x2",         audienciaId:"AUD-0034", inicio:"2026-04-01", fin:"2026-04-30", unidades:14200, bultos:710,  kilos:2130, adminUrl:"https://admin.tokintienda.com/tokinAdmin/front/promotions/PROMO-H004" },
  { id:"PROMO-H005", nombre:"2x1 Mogul Masti Junio",         negocio:"Golosinas",  tipo:"Más por Menos", subtipo:"2x1",         audienciaId:"AUD-0056", inicio:"2026-06-01", fin:"2026-06-30", unidades:67000, bultos:2790, kilos:4020, adminUrl:"https://admin.tokintienda.com/tokinAdmin/front/promotions/PROMO-H005" },
  { id:"PROMO-H006", nombre:"10% Barritas Águila Junio",     negocio:"Helados",    tipo:"Regular",       subtipo:"Descuento %", audienciaId:"AUD-0091", inicio:"2026-06-16", fin:"2026-06-18", unidades:8900,  bultos:420,  kilos:980,  adminUrl:"https://admin.tokintienda.com/tokinAdmin/front/promotions/PROMO-H006" },
];

// ─── DATOS MOCK ESPACIOS ACTIVOS ─────────────────────────────────────────────
const ESPACIOS_ACTIVOS = [
  { id:"BAN-001", nombre:"Landing Invierno 2026",           tipo:"Landing Pages",    audienciaId:"AUD-0001", inicio:"2026-07-01", fin:"2026-07-31", ctr:4.2,  adminUrl:"https://admin.tokintienda.com/tokinAdmin/front/spaces/BAN-001" },
  { id:"BAN-002", nombre:"Pop Up Acuerdo Comercial XYZ",    tipo:"Pop Up",           audienciaId:"AUD-0034", inicio:"2026-07-01", fin:"2026-07-15", ctr:2.8,  adminUrl:"https://admin.tokintienda.com/tokinAdmin/front/spaces/BAN-002" },
  { id:"BAN-003", nombre:"Hero Campaña Snacks",             tipo:"Banner Hero",      audienciaId:"AUD-0012", inicio:"2026-07-05", fin:"2026-07-20", ctr:6.1,  adminUrl:"https://admin.tokintienda.com/tokinAdmin/front/spaces/BAN-003" },
  { id:"BAN-004", nombre:"Top Bar Novedad Progresiva",      tipo:"Top Bar",          audienciaId:"AUD-0001", inicio:"2026-07-01", fin:"2026-07-31", ctr:1.9,  adminUrl:"https://admin.tokintienda.com/tokinAdmin/front/spaces/BAN-004" },
  { id:"BAN-005", nombre:"Banner Search Lácteos",           tipo:"Banner Search",    audienciaId:"AUD-0078", inicio:"2026-07-01", fin:"2026-07-15", ctr:3.4,  adminUrl:"https://admin.tokintienda.com/tokinAdmin/front/spaces/BAN-005" },
  { id:"BAN-006", nombre:"Banner Cart Gaseosas",            tipo:"Banner Cart",      audienciaId:"AUD-0045", inicio:"2026-07-08", fin:"2026-07-22", ctr:5.7,  adminUrl:"https://admin.tokintienda.com/tokinAdmin/front/spaces/BAN-006" },
  { id:"BAN-007", nombre:"Banner Novedades Alfajores",      tipo:"Banner Novedades", audienciaId:"AUD-0056", inicio:"2026-07-15", fin:"2026-07-31", ctr:0,    adminUrl:"https://admin.tokintienda.com/tokinAdmin/front/spaces/BAN-007" },
];

// ─── DATOS MOCK ESPACIOS HISTORIAL ───────────────────────────────────────────
const ESPACIOS_HISTORIAL = [
  { id:"BAN-H001", nombre:"Landing Día de la Madre",       tipo:"Landing Pages",    audienciaId:"AUD-0001", inicio:"2026-05-20", fin:"2026-05-26", ctr:7.3,  adminUrl:"https://admin.tokintienda.com/tokinAdmin/front/spaces/BAN-H001" },
  { id:"BAN-H002", nombre:"Hero Campaña Otoño",            tipo:"Banner Hero",      audienciaId:"AUD-0012", inicio:"2026-04-01", fin:"2026-05-31", ctr:5.8,  adminUrl:"https://admin.tokintienda.com/tokinAdmin/front/spaces/BAN-H002" },
  { id:"BAN-H003", nombre:"Pop Up Acuerdo Banco XYZ",      tipo:"Pop Up",           audienciaId:"AUD-0034", inicio:"2026-03-15", fin:"2026-04-15", ctr:3.2,  adminUrl:"https://admin.tokintienda.com/tokinAdmin/front/spaces/BAN-H003" },
  { id:"BAN-H004", nombre:"Top Bar Semana Santa",          tipo:"Top Bar",          audienciaId:"AUD-0001", inicio:"2026-03-28", fin:"2026-04-02", ctr:2.1,  adminUrl:"https://admin.tokintienda.com/tokinAdmin/front/spaces/BAN-H004" },
  { id:"BAN-H005", nombre:"Banner Search Yerba Mate",      tipo:"Banner Search",    audienciaId:"AUD-0012", inicio:"2026-05-10", fin:"2026-05-20", ctr:4.6,  adminUrl:"https://admin.tokintienda.com/tokinAdmin/front/spaces/BAN-H005" },
  { id:"BAN-H006", nombre:"Banner Cart Chocolates",        tipo:"Banner Cart",      audienciaId:"AUD-0045", inicio:"2026-04-10", fin:"2026-04-20", ctr:6.2,  adminUrl:"https://admin.tokintienda.com/tokinAdmin/front/spaces/BAN-H006" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function addDays(d, n) { const r = new Date(d); r.setDate(r.getDate()+n); return r; }
function fmtDate(d) { return d instanceof Date ? d.toISOString().split("T")[0] : d; }
function fmtDiaMes(d) { return `${d.getDate()} ${["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"][d.getMonth()]}`; }
const HOY = new Date(2026, 6, 8); // 8 jul 2026
const DIAS_FULL = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
const DIAS_SHORT = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];

function itemsEnFecha(lista, fecha) {
  return lista.filter(i => i.inicio <= fecha && i.fin >= fecha);
}

// ─── ICONOS SVG ──────────────────────────────────────────────────────────────
const IconPromo     = ({size=16,color="currentColor"}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
const IconEspacio   = ({size=16,color="currentColor"}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>;
const IconCalendario= ({size=16,color="currentColor"}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IconHistorial = ({size=16,color="currentColor"}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const IconLink      = ({size=14,color="currentColor"}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;

// ─── COMPONENTES BASE ─────────────────────────────────────────────────────────
function Tag({ label, colMap }) {
  const c = colMap[label] || { bg:"#f1f5f9", border:"#94a3b8", text:"#475569" };
  return <span style={{display:"inline-block",padding:"2px 8px",borderRadius:4,background:c.bg,color:c.text,border:`1px solid ${c.border}`,fontSize:11,fontWeight:700,whiteSpace:"nowrap"}}>{label}</span>;
}

function KPI({ label, value, color="#1E6FD9", sub }) {
  return (
    <div style={{flex:1,minWidth:100,background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,padding:"12px 14px"}}>
      <div style={{fontSize:10,color:"#94a3b8",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:4}}>{label}</div>
      <div style={{fontSize:20,fontWeight:800,color,lineHeight:1}}>{value}</div>
      {sub && <div style={{fontSize:10,color:"#94a3b8",marginTop:3}}>{sub}</div>}
    </div>
  );
}

function LinkAdmin({ url }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:12,color:AZUL,fontWeight:600,textDecoration:"none",background:"#E8F0FE",padding:"4px 10px",borderRadius:6,border:`1px solid ${AZUL}33`}}>
      <IconLink size={12} color={AZUL}/> Ver en Admin
    </a>
  );
}

// ─── REAL TIME HOOK ───────────────────────────────────────────────────────────
function useRealTime(base, active) {
  const [val, setVal] = useState(base);
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setVal(v => v + Math.floor(Math.random() * 15));
    }, 3000);
    return () => clearInterval(interval);
  }, [active]);
  return val;
}

// ─── CARD PROMO ───────────────────────────────────────────────────────────────
function CardPromo({ item, realtime=false }) {
  const [open, setOpen] = useState(false);
  const unidades = useRealTime(item.unidades, realtime && open);
  const bultos   = useRealTime(item.bultos,   realtime && open);
  const kilos    = useRealTime(item.kilos,    realtime && open);
  const activa   = item.inicio <= fmtDate(HOY) && item.fin >= fmtDate(HOY);

  return (
    <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,marginBottom:8,overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
      <div onClick={()=>setOpen(!open)} style={{padding:"12px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:12}}
        onMouseEnter={e=>e.currentTarget.style.background="#f8fafc"}
        onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4}}>
            <Tag label={item.negocio} colMap={NEGOCIO_COL}/>
            <span style={{fontSize:11,color:"#94a3b8"}}>{item.id}</span>
            {realtime && activa && <span style={{display:"inline-flex",alignItems:"center",gap:4,fontSize:10,fontWeight:700,color:"#16a34a",background:"#f0fdf4",padding:"2px 7px",borderRadius:99,border:"1px solid #bbf7d0"}}><span style={{width:6,height:6,borderRadius:"50%",background:"#16a34a",display:"inline-block",animation:"pulse 1.5s infinite"}}/>EN VIVO</span>}
          </div>
          <div style={{fontWeight:700,fontSize:14,color:"#1e293b"}}>{item.nombre}</div>
          <div style={{fontSize:12,color:"#94a3b8",marginTop:2}}>{item.inicio} → {item.fin} · Aud: <strong>{item.audienciaId}</strong></div>
        </div>
        <div style={{fontSize:13,color:"#94a3b8"}}>{open?"▲":"▼"}</div>
      </div>

      {open && (
        <div style={{padding:"14px 16px",borderTop:"1px solid #f1f5f9",background:"#fafbff"}}>
          <div style={{display:"flex",gap:10,marginBottom:12,flexWrap:"wrap"}}>
            <KPI label="Unidades" value={unidades.toLocaleString("es-AR")} color="#1E6FD9" sub="vendidas"/>
            <KPI label="Bultos"   value={bultos.toLocaleString("es-AR")}   color="#d97706" sub="vendidos"/>
            <KPI label="Kilos"    value={kilos.toLocaleString("es-AR")}    color="#8b5cf6" sub="vendidos"/>
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
            <div style={{fontSize:12,color:"#64748b"}}>
              <strong>Tipo:</strong> {item.tipo} · {item.subtipo} &nbsp;|&nbsp; <strong>Audiencia:</strong> {item.audienciaId}
            </div>
            <LinkAdmin url={item.adminUrl}/>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CARD ESPACIO ─────────────────────────────────────────────────────────────
function CardEspacio({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,marginBottom:8,overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
      <div onClick={()=>setOpen(!open)} style={{padding:"12px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:12}}
        onMouseEnter={e=>e.currentTarget.style.background="#f8fafc"}
        onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4}}>
            <Tag label={item.tipo} colMap={ESPACIO_COL}/>
            <span style={{fontSize:11,color:"#94a3b8"}}>{item.id}</span>
          </div>
          <div style={{fontWeight:700,fontSize:14,color:"#1e293b"}}>{item.nombre}</div>
          <div style={{fontSize:12,color:"#94a3b8",marginTop:2}}>{item.inicio} → {item.fin} · Aud: <strong>{item.audienciaId}</strong></div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:16,fontWeight:800,color:item.ctr>=5?"#16a34a":item.ctr>=2?"#d97706":"#94a3b8"}}>{item.ctr>0?`${item.ctr}%`:"—"}</div>
          <div style={{fontSize:10,color:"#94a3b8"}}>CTR</div>
        </div>
        <div style={{fontSize:13,color:"#94a3b8",marginLeft:8}}>{open?"▲":"▼"}</div>
      </div>

      {open && (
        <div style={{padding:"14px 16px",borderTop:"1px solid #f1f5f9",background:"#fafbff"}}>
          <div style={{display:"flex",gap:10,marginBottom:12,flexWrap:"wrap"}}>
            <KPI label="CTR" value={item.ctr>0?`${item.ctr}%`:"Sin datos"} color={item.ctr>=5?"#16a34a":item.ctr>=2?"#d97706":"#94a3b8"} sub="conversión"/>
          </div>
          <div style={{fontSize:12,color:"#64748b",marginBottom:10}}>
            <strong>Tipo:</strong> {item.tipo} &nbsp;|&nbsp; <strong>Audiencia:</strong> {item.audienciaId} &nbsp;|&nbsp; <strong>Vigencia:</strong> {item.inicio} → {item.fin}
          </div>
          <div style={{background:"#f1f5f9",borderRadius:8,padding:"8px 12px",fontSize:12,color:"#475569",marginBottom:10}}>
            <strong>CTR:</strong> productos pedidos que fueron agregados gracias a este espacio publicitario.
          </div>
          <LinkAdmin url={item.adminUrl}/>
        </div>
      )}
    </div>
  );
}

// ─── CALENDARIO GENÉRICO ─────────────────────────────────────────────────────
function CalendarioVista({ lista, groupKey, colMap, CardComponent, realtime=false }) {
  const [vista, setVista]     = useState("semanal");
  const [fechaRef, setFechaRef] = useState(HOY);

  const inicioSemana = d => { const r = new Date(d); r.setDate(r.getDate()-r.getDay()); return r; };
  const anterior  = () => setFechaRef(d => addDays(d, vista==="semanal"?-7:-1));
  const siguiente = () => setFechaRef(d => addDays(d, vista==="semanal"?7:1));

  const labelPeriodo = () => {
    if (vista==="semanal") {
      const ini = inicioSemana(fechaRef);
      return `${fmtDiaMes(ini)} – ${fmtDiaMes(addDays(ini,6))} ${fechaRef.getFullYear()}`;
    }
    return `${DIAS_FULL[fechaRef.getDay()]}, ${fmtDiaMes(fechaRef)} ${fechaRef.getFullYear()}`;
  };

  const diasMostrar = vista==="semanal"
    ? Array.from({length:7},(_,i)=>addDays(inicioSemana(fechaRef),i))
    : [fechaRef];

  const grupos = [...new Set(lista.map(i=>i[groupKey]))];

  return (
    <div>
      {/* Controles */}
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20,flexWrap:"wrap"}}>
        <div style={{display:"flex",border:"1px solid #e2e8f0",borderRadius:8,overflow:"hidden"}}>
          {[["semanal","Semana"],["diaria","Día"]].map(([id,label])=>(
            <button key={id} onClick={()=>setVista(id)}
              style={{padding:"7px 16px",border:"none",background:vista===id?AZUL:"#fff",color:vista===id?"#fff":"#64748b",fontSize:13,fontWeight:vista===id?700:400,cursor:"pointer",fontFamily:"Roboto,sans-serif"}}>
              {label}
            </button>
          ))}
        </div>
        <button onClick={anterior}  style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:8,padding:"7px 14px",cursor:"pointer",fontSize:15,color:"#64748b"}}>‹</button>
        <div style={{fontWeight:700,fontSize:14,color:"#1e293b",minWidth:220,textAlign:"center"}}>{labelPeriodo()}</div>
        <button onClick={siguiente} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:8,padding:"7px 14px",cursor:"pointer",fontSize:15,color:"#64748b"}}>›</button>
        <button onClick={()=>setFechaRef(HOY)} style={{background:"#E8F0FE",border:`1px solid ${AZUL}`,borderRadius:8,padding:"7px 14px",cursor:"pointer",fontSize:12,fontWeight:600,color:AZUL,fontFamily:"Roboto,sans-serif"}}>Hoy</button>
      </div>

      {/* Vista semanal — agenda por día */}
      {diasMostrar.map(dia => {
        const fecha = fmtDate(dia);
        const esHoy = fecha === fmtDate(HOY);
        const items = itemsEnFecha(lista, fecha);
        if (vista==="semanal" && items.length===0) return null;

        return (
          <div key={fecha} style={{marginBottom:24}}>
            {/* Header día */}
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <div style={{width:36,height:36,borderRadius:"50%",background:esHoy?AZUL:"#fff",border:`2px solid ${esHoy?AZUL:"#e2e8f0"}`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:14,color:esHoy?"#fff":"#1e293b",flexShrink:0}}>
                {dia.getDate()}
              </div>
              <div>
                <div style={{fontWeight:700,fontSize:14,color:"#1e293b"}}>{esHoy?"Hoy, ":""}{DIAS_FULL[dia.getDay()]}</div>
                <div style={{fontSize:11,color:"#94a3b8"}}>{items.length} ítem{items.length!==1?"s":""} activo{items.length!==1?"s":""}</div>
              </div>
            </div>

            {/* Agrupado por negocio/tipo */}
            <div style={{marginLeft:18,paddingLeft:18,borderLeft:"2px solid #e2e8f0"}}>
              {grupos.map(grupo => {
                const g = items.filter(i=>i[groupKey]===grupo);
                if (!g.length) return null;
                const c = colMap[grupo]||{bg:"#f1f5f9",border:"#94a3b8",text:"#475569"};
                return (
                  <div key={grupo} style={{marginBottom:12}}>
                    <div style={{display:"inline-flex",alignItems:"center",gap:6,marginBottom:6,padding:"3px 10px",borderRadius:99,background:c.bg,border:`1px solid ${c.border}`}}>
                      <span style={{fontSize:12,fontWeight:700,color:c.text}}>{grupo}</span>
                      <span style={{fontSize:11,color:c.text,opacity:0.7}}>{g.length}</span>
                    </div>
                    {g.map(item => <CardComponent key={item.id} item={item} realtime={realtime}/>)}
                  </div>
                );
              })}
              {items.length===0 && <div style={{fontSize:13,color:"#94a3b8",padding:"8px 0"}}>Sin ítems activos este día.</div>}
            </div>
          </div>
        );
      })}
      {vista==="semanal" && diasMostrar.every(d=>itemsEnFecha(lista,fmtDate(d)).length===0) && (
        <div style={{padding:48,textAlign:"center",color:"#94a3b8",fontSize:14,background:"#fff",borderRadius:14,border:"1px solid #e2e8f0"}}>
          No hay ítems activos esta semana.
        </div>
      )}
    </div>
  );
}

// ─── HISTORIAL PROMOCIONES ────────────────────────────────────────────────────
function HistorialPromos() {
  const [busqueda, setBusqueda] = useState("");
  const filtered = PROMOS_HISTORIAL.filter(i =>
    !busqueda || i.nombre.toLowerCase().includes(busqueda.toLowerCase()) || i.id.toLowerCase().includes(busqueda.toLowerCase())
  );
  return (
    <div>
      <div style={{position:"relative",marginBottom:16,maxWidth:400}}>
        <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#94a3b8",fontSize:15,pointerEvents:"none"}}>🔍</span>
        <input type="text" placeholder="Buscar promoción..." value={busqueda} onChange={e=>setBusqueda(e.target.value)}
          style={{width:"100%",padding:"9px 12px 9px 36px",border:"1px solid #e2e8f0",borderRadius:10,fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:"Roboto,sans-serif"}}
          onFocus={e=>e.target.style.borderColor=AZUL} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
      </div>
      {filtered.map(item => (
        <div key={item.id} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,marginBottom:12,overflow:"hidden"}}>
          <div style={{padding:"16px 20px",borderBottom:"1px solid #f1f5f9",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4,flexWrap:"wrap"}}>
                <Tag label={item.negocio} colMap={NEGOCIO_COL}/>
                <span style={{fontSize:11,color:"#94a3b8"}}>{item.id}</span>
              </div>
              <div style={{fontWeight:700,fontSize:15,color:"#1e293b"}}>{item.nombre}</div>
              <div style={{fontSize:12,color:"#94a3b8",marginTop:2}}>{item.inicio} → {item.fin} · Aud: <strong>{item.audienciaId}</strong></div>
            </div>
            <LinkAdmin url={item.adminUrl}/>
          </div>
          <div style={{padding:"14px 20px",display:"flex",gap:10,flexWrap:"wrap"}}>
            <KPI label="Unidades" value={item.unidades.toLocaleString("es-AR")} color="#1E6FD9" sub="vendidas"/>
            <KPI label="Bultos"   value={item.bultos.toLocaleString("es-AR")}   color="#d97706" sub="vendidos"/>
            <KPI label="Kilos"    value={item.kilos.toLocaleString("es-AR")}    color="#8b5cf6" sub="vendidos"/>
          </div>
        </div>
      ))}
      {filtered.length===0 && <div style={{padding:48,textAlign:"center",color:"#94a3b8"}}>No hay resultados.</div>}
    </div>
  );
}

// ─── HISTORIAL ESPACIOS ───────────────────────────────────────────────────────
function HistorialEspacios() {
  const [busqueda, setBusqueda] = useState("");
  const filtered = ESPACIOS_HISTORIAL.filter(i =>
    !busqueda || i.nombre.toLowerCase().includes(busqueda.toLowerCase()) || i.id.toLowerCase().includes(busqueda.toLowerCase())
  );
  return (
    <div>
      <div style={{position:"relative",marginBottom:16,maxWidth:400}}>
        <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#94a3b8",fontSize:15,pointerEvents:"none"}}>🔍</span>
        <input type="text" placeholder="Buscar espacio..." value={busqueda} onChange={e=>setBusqueda(e.target.value)}
          style={{width:"100%",padding:"9px 12px 9px 36px",border:"1px solid #e2e8f0",borderRadius:10,fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:"Roboto,sans-serif"}}
          onFocus={e=>e.target.style.borderColor=AZUL} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
      </div>
      {filtered.map(item => (
        <div key={item.id} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,marginBottom:12,overflow:"hidden"}}>
          <div style={{padding:"16px 20px",borderBottom:"1px solid #f1f5f9",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4,flexWrap:"wrap"}}>
                <Tag label={item.tipo} colMap={ESPACIO_COL}/>
                <span style={{fontSize:11,color:"#94a3b8"}}>{item.id}</span>
              </div>
              <div style={{fontWeight:700,fontSize:15,color:"#1e293b"}}>{item.nombre}</div>
              <div style={{fontSize:12,color:"#94a3b8",marginTop:2}}>{item.inicio} → {item.fin} · Aud: <strong>{item.audienciaId}</strong></div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:22,fontWeight:800,color:item.ctr>=5?"#16a34a":item.ctr>=2?"#d97706":"#94a3b8"}}>{item.ctr}%</div>
              <div style={{fontSize:11,color:"#94a3b8"}}>CTR final</div>
            </div>
            <LinkAdmin url={item.adminUrl}/>
          </div>
          <div style={{padding:"12px 20px",background:"#fafbff",fontSize:12,color:"#64748b"}}>
            <strong>CTR:</strong> {item.ctr}% de conversión — productos pedidos gracias a este espacio publicitario.
          </div>
        </div>
      ))}
      {filtered.length===0 && <div style={{padding:48,textAlign:"center",color:"#94a3b8"}}>No hay resultados.</div>}
    </div>
  );
}

// ─── MÓDULO PROMOCIONES ───────────────────────────────────────────────────────
function ModuloPromociones() {
  const [subTab, setSubTab] = useState("calendario");
  return (
    <div>
      <div style={{display:"flex",gap:4,marginBottom:24,borderBottom:"1px solid #e2e8f0"}}>
        {[["calendario","Calendario",<IconCalendario size={15}/>],["historial","Historial",<IconHistorial size={15}/>]].map(([id,label,icon])=>(
          <button key={id} onClick={()=>setSubTab(id)}
            style={{padding:"10px 20px",border:"none",background:"transparent",cursor:"pointer",fontSize:14,fontWeight:subTab===id?700:500,color:subTab===id?AZUL:"#64748b",borderBottom:subTab===id?`2px solid ${AZUL}`:"2px solid transparent",display:"flex",alignItems:"center",gap:8,fontFamily:"Roboto,sans-serif"}}>
            {React.cloneElement(icon,{color:subTab===id?AZUL:"#64748b"})}
            {label}
          </button>
        ))}
      </div>
      {subTab==="calendario" && (
        <CalendarioVista
          lista={PROMOS_ACTIVAS}
          groupKey="negocio"
          colMap={NEGOCIO_COL}
          CardComponent={CardPromo}
          realtime={true}
        />
      )}
      {subTab==="historial" && <HistorialPromos/>}
    </div>
  );
}

// ─── MÓDULO ESPACIOS ──────────────────────────────────────────────────────────
function ModuloEspacios() {
  const [subTab, setSubTab] = useState("calendario");
  return (
    <div>
      <div style={{display:"flex",gap:4,marginBottom:24,borderBottom:"1px solid #e2e8f0"}}>
        {[["calendario","Calendario",<IconCalendario size={15}/>],["historial","Historial",<IconHistorial size={15}/>]].map(([id,label,icon])=>(
          <button key={id} onClick={()=>setSubTab(id)}
            style={{padding:"10px 20px",border:"none",background:"transparent",cursor:"pointer",fontSize:14,fontWeight:subTab===id?700:500,color:subTab===id?AZUL:"#64748b",borderBottom:subTab===id?`2px solid ${AZUL}`:"2px solid transparent",display:"flex",alignItems:"center",gap:8,fontFamily:"Roboto,sans-serif"}}>
            {React.cloneElement(icon,{color:subTab===id?AZUL:"#64748b"})}
            {label}
          </button>
        ))}
      </div>
      {subTab==="calendario" && (
        <CalendarioVista
          lista={ESPACIOS_ACTIVOS}
          groupKey="tipo"
          colMap={ESPACIO_COL}
          CardComponent={CardEspacio}
        />
      )}
      {subTab==="historial" && <HistorialEspacios/>}
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [verPass, setVerPass] = useState(false);
  const handleSubmit = () => {
    const u = USUARIOS.find(u=>u.usuario===usuario.trim()&&u.password===password);
    if(u){onLogin(u);}else{setError("Usuario o contraseña incorrectos.");}
  };
  return (
    <div style={{minHeight:"100vh",minHeight:"100dvh",background:`linear-gradient(135deg,#E8F0FE 0%,#dbeafe 100%)`,display:"flex",flexDirection:"column",justifyContent:"center",fontFamily:"'Roboto',sans-serif",padding:"0 16px"}}>
      <div style={{background:"#fff",borderRadius:20,padding:"40px 32px",width:"100%",maxWidth:420,margin:"0 auto",boxShadow:"0 8px 32px rgba(30,111,217,0.12)"}}>
        <div style={{marginBottom:28}}>
          <div style={{fontSize:24,fontWeight:800,color:AZUL,letterSpacing:"-0.02em"}}>Tokin<span style={{display:"inline-block",width:7,height:7,borderRadius:"50%",background:AZUL,marginLeft:2,marginBottom:10}}></span></div>
          <div style={{fontSize:15,fontWeight:700,color:"#1e293b"}}>Panel de Verdad Única</div>
          <div style={{fontSize:12,color:"#94a3b8"}}>Acceso interno</div>
        </div>
        <div style={{marginBottom:14}}>
          <label style={{fontSize:14,fontWeight:600,color:"#374151",display:"block",marginBottom:6}}>Usuario</label>
          <input type="text" value={usuario} onChange={e=>{setUsuario(e.target.value);setError("");}} onKeyDown={e=>e.key==="Enter"&&handleSubmit()} placeholder="Tu usuario"
            style={{width:"100%",padding:"14px 16px",border:`1.5px solid ${error?"#fca5a5":"#e2e8f0"}`,borderRadius:12,fontSize:16,color:"#1e293b",outline:"none",boxSizing:"border-box",fontFamily:"Roboto,sans-serif"}}
            onFocus={e=>e.target.style.borderColor=AZUL} onBlur={e=>e.target.style.borderColor=error?"#fca5a5":"#e2e8f0"}/>
        </div>
        <div style={{marginBottom:10}}>
          <label style={{fontSize:14,fontWeight:600,color:"#374151",display:"block",marginBottom:6}}>Contraseña</label>
          <div style={{position:"relative"}}>
            <input type={verPass?"text":"password"} value={password} onChange={e=>{setPassword(e.target.value);setError("");}} onKeyDown={e=>e.key==="Enter"&&handleSubmit()} placeholder="Tu contraseña"
              style={{width:"100%",padding:"14px 48px 14px 16px",border:`1.5px solid ${error?"#fca5a5":"#e2e8f0"}`,borderRadius:12,fontSize:16,color:"#1e293b",outline:"none",boxSizing:"border-box",fontFamily:"Roboto,sans-serif"}}
              onFocus={e=>e.target.style.borderColor=AZUL} onBlur={e=>e.target.style.borderColor=error?"#fca5a5":"#e2e8f0"}/>
            <button onClick={()=>setVerPass(!verPass)} style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#94a3b8",fontSize:18,padding:0}}>
              {verPass?"🙈":"👁"}
            </button>
          </div>
        </div>
        {error && <div style={{fontSize:13,color:"#dc2626",marginBottom:12,padding:"10px 14px",background:"#fef2f2",borderRadius:10,border:"1px solid #fecaca"}}>{error}</div>}
        <button onClick={handleSubmit}
          style={{width:"100%",padding:"15px",background:AZUL,color:"#fff",border:"none",borderRadius:12,fontSize:16,fontWeight:700,cursor:"pointer",marginTop:8,fontFamily:"Roboto,sans-serif"}}>
          Ingresar
        </button>
      </div>
    </div>
  );
}

// ─── APP PRINCIPAL ────────────────────────────────────────────────────────────
function PVU({ user, onLogout }) {
  const [tab, setTab] = useState("promos");
  const isMobile = window.innerWidth <= 768;

  const tabs = [
    { id:"promos",   label:"Promociones", icon:<IconPromo/>  },
    { id:"espacios", label:"Espacios pub.",icon:<IconEspacio/>},
  ];

  return (
    <div style={{minHeight:"100vh",background:"#F5F7FA",fontFamily:"'Roboto',sans-serif"}}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @media(max-width:768px){
          .pvu-header-inner{padding:0 12px!important}
          .pvu-header-top{padding:10px 0 0!important}
          .pvu-content{padding:12px 12px 80px!important}
          .pvu-tabs button{padding:8px 14px!important;font-size:13px!important}
          .pvu-bottom-nav{display:flex!important}
        }
        @media(min-width:769px){
          .pvu-bottom-nav{display:none!important}
        }
      `}</style>

      {/* HEADER */}
      <div style={{background:"#fff",borderBottom:"1px solid #e2e8f0",padding:"0 32px",position:"sticky",top:0,zIndex:50}}>
        <div className="pvu-header-inner" style={{maxWidth:1200,margin:"0 auto"}}>
          <div className="pvu-header-top" style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 0 0"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div>
                <span style={{fontSize:isMobile?18:22,fontWeight:800,color:AZUL,letterSpacing:"-0.02em"}}>Tokin</span>
                <span style={{display:"inline-block",width:6,height:6,borderRadius:"50%",background:AZUL,marginLeft:2,marginBottom:8}}/>
              </div>
              {!isMobile && (
                <div>
                  <div style={{fontSize:15,fontWeight:700,color:"#1e293b"}}>Panel de Verdad Única</div>
                  <div style={{fontSize:11,color:"#94a3b8"}}>Estado en tiempo real</div>
                </div>
              )}
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{fontSize:12,color:"#64748b",background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:8,padding:"6px 12px",fontWeight:500}}>
                👤 {isMobile ? user.usuario : user.nombre}
              </div>
              <button onClick={onLogout} style={{fontSize:12,color:"#94a3b8",background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:8,padding:"6px 12px",cursor:"pointer",fontFamily:"Roboto,sans-serif"}}>
                Salir
              </button>
            </div>
          </div>

          {/* Tabs desktop */}
          <div className="pvu-tabs" style={{display:"flex",gap:4,marginTop:12}}>
            {tabs.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)}
                style={{padding:"10px 20px",border:"none",background:"transparent",cursor:"pointer",fontSize:14,fontWeight:tab===t.id?700:500,color:tab===t.id?AZUL:"#64748b",borderBottom:tab===t.id?`2px solid ${AZUL}`:"2px solid transparent",display:"flex",alignItems:"center",gap:8,whiteSpace:"nowrap",fontFamily:"Roboto,sans-serif"}}>
                {React.cloneElement(t.icon,{color:tab===t.id?AZUL:"#64748b"})}
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="pvu-content" style={{maxWidth:1200,margin:"0 auto",padding:"28px 32px"}}>
        {tab==="promos"   && <ModuloPromociones/>}
        {tab==="espacios" && <ModuloEspacios/>}
      </div>

      {/* NAV INFERIOR MOBILE */}
      <div className="pvu-bottom-nav" style={{position:"fixed",bottom:0,left:0,right:0,background:"#fff",borderTop:"1px solid #e2e8f0",zIndex:100}}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)}
            style={{flex:1,padding:"10px 4px 12px",border:"none",background:"transparent",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,fontFamily:"Roboto,sans-serif"}}>
            {React.cloneElement(t.icon,{size:22,color:tab===t.id?AZUL:"#94a3b8"})}
            <span style={{fontSize:10,fontWeight:tab===t.id?700:400,color:tab===t.id?AZUL:"#94a3b8"}}>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  if (!user) return <Login onLogin={setUser}/>;
  return <PVU user={user} onLogout={()=>setUser(null)}/>;
}
