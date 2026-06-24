import { useState, useEffect, useRef } from "react";
import React from "react";

// ─── USUARIOS ───────────────────────────────────────────────────────────────
const USUARIOS = [
  { usuario: "admin",        password: "pvu2026",  nombre: "Administrador",      mail: "gjromano@arcor.com",        rol: "admin" },
  { usuario: "operaciones",  password: "ops123",   nombre: "Equipo Operaciones",  mail: "operaciones@tokin.com.ar",  rol: "ops"   },
  { usuario: "comunicacion", password: "com123",   nombre: "Equipo Comunicación", mail: "comunicacion@tokin.com.ar", rol: "comms" },
  { usuario: "promociones",  password: "promo123", nombre: "Equipo Promociones",  mail: "promociones@tokin.com.ar",  rol: "promo" },
];

// ─── DATOS MOCK ──────────────────────────────────────────────────────────────
const PROMOS = [
  { id:"PROMO-001", nombre:"20% OFF Gaseosas",         tipo:"Regular",       subtipo:"Descuento %",         estado:"activo",   inicio:"2026-06-15", fin:"2026-06-30", audiencia:"Kioscos del Litoral",              pdvsSegmento:1240, pdvsAlcanzados:1240, cobertura:100, ultimaVerificacion:"hace 2 min",  detalle:"20% de descuento en toda la categoría Gaseosas" },
  { id:"PROMO-002", nombre:"3x2 en Snacks",            tipo:"Más por Menos", subtipo:"3x2",                 estado:"activo",   inicio:"2026-06-20", fin:"2026-07-05", audiencia:"Almacenes Cat. A y B1",            pdvsSegmento:3800, pdvsAlcanzados:3420, cobertura:90,  ultimaVerificacion:"hace 5 min",  detalle:"Llevá 3 unidades y pagá 2 en Snacks seleccionados" },
  { id:"PROMO-003", nombre:"Progresiva Lácteos",       tipo:"Progresiva",    subtipo:"10u→15% / 20u→30%",   estado:"alerta",   inicio:"2026-06-22", fin:"2026-07-10", audiencia:"Dietéticas GBA Norte",             pdvsSegmento:520,  pdvsAlcanzados:210,  cobertura:40,  ultimaVerificacion:"hace 14 min", detalle:"10 unidades: 15% OFF · 20 unidades: 30% OFF en Lácteos" },
  { id:"PROMO-004", nombre:"2x1 Agua Mineral",         tipo:"Más por Menos", subtipo:"2x1",                 estado:"inactivo", inicio:"2026-07-01", fin:"2026-07-15", audiencia:"Estaciones de Servicio YPF Propias",pdvsSegmento:890,  pdvsAlcanzados:0,    cobertura:0,   ultimaVerificacion:"—",           detalle:"Llevá 2 y pagá 1 en Agua Mineral 500ml" },
  { id:"PROMO-005", nombre:"Progresiva Alfajores",     tipo:"Progresiva",    subtipo:"10u→20% / 20u→40%",   estado:"activo",   inicio:"2026-06-01", fin:"2026-06-30", audiencia:"Kioscos Acuerdo Comercial XYZ",    pdvsSegmento:2100, pdvsAlcanzados:2100, cobertura:100, ultimaVerificacion:"hace 1 min",  detalle:"10 unidades: 20% OFF · 20 unidades: 40% OFF en Alfajores" },
  { id:"PROMO-006", nombre:"4x3 Bebidas Energéticas",  tipo:"Más por Menos", subtipo:"4x3",                 estado:"activo",   inicio:"2026-06-18", fin:"2026-06-28", audiencia:"Establecimientos Educativos",      pdvsSegmento:670,  pdvsAlcanzados:670,  cobertura:100, ultimaVerificacion:"hace 3 min",  detalle:"Llevá 4 y pagá 3 en Bebidas Energéticas" },
];

const BANNERS = [
  { id:"BAN-001", nombre:"Landing Invierno 2026",              espacio:"Landing Tematizada", estado:"activo",   inicio:"2026-06-15", fin:"2026-06-30", audiencia:"Todos los PDVs",                    pdvsSegmento:12400, pdvsAlcanzados:12400, cobertura:100, ultimaVerificacion:"hace 2 min",  detalle:"Landing de temporada invierno con foco en bebidas calientes" },
  { id:"BAN-002", nombre:"Pop Up — Acuerdo Comercial XYZ",     espacio:"Pop Up",             estado:"alerta",   inicio:"2026-06-20", fin:"2026-07-10", audiencia:"Kioscos Acuerdo Comercial XYZ",     pdvsSegmento:2100,  pdvsAlcanzados:1260,  cobertura:60,  ultimaVerificacion:"hace 9 min",  detalle:"Pop up de activación para PDVs con acuerdo comercial activo" },
  { id:"BAN-003", nombre:"Hero — Campaña Snacks",              espacio:"Banner Hero",        estado:"activo",   inicio:"2026-06-22", fin:"2026-07-05", audiencia:"Almacenes Cat. A y B1",             pdvsSegmento:3800,  pdvsAlcanzados:3800,  cobertura:100, ultimaVerificacion:"hace 1 min",  detalle:"Banner principal con foco en la campaña de snacks de invierno" },
  { id:"BAN-004", nombre:"Top Bar — Novedad Progresiva",       espacio:"Top Bar",            estado:"activo",   inicio:"2026-06-22", fin:"2026-06-30", audiencia:"Todos los PDVs",                    pdvsSegmento:12400, pdvsAlcanzados:12400, cobertura:100, ultimaVerificacion:"hace 4 min",  detalle:"Barra superior comunicando la nueva mecánica progresiva" },
  { id:"BAN-005", nombre:"Banner Search — Lácteos",            espacio:"Banner Search",      estado:"alerta",   inicio:"2026-06-20", fin:"2026-07-10", audiencia:"Dietéticas GBA Norte",              pdvsSegmento:520,   pdvsAlcanzados:312,   cobertura:60,  ultimaVerificacion:"hace 11 min", detalle:"Aparece en búsquedas de categoría Lácteos" },
  { id:"BAN-006", nombre:"Banner Cart — Descuento Gaseosas",   espacio:"Banner Cart",        estado:"activo",   inicio:"2026-06-15", fin:"2026-06-30", audiencia:"Kioscos del Litoral",               pdvsSegmento:1240,  pdvsAlcanzados:1240,  cobertura:100, ultimaVerificacion:"hace 3 min",  detalle:"Aparece en el carrito recordando el descuento en Gaseosas" },
  { id:"BAN-007", nombre:"Banner Novedades — Progresiva Alfajores", espacio:"Banner Novedades", estado:"inactivo", inicio:"2026-07-01", fin:"2026-07-15", audiencia:"Estaciones de Servicio YPF Propias", pdvsSegmento:890, pdvsAlcanzados:0, cobertura:0, ultimaVerificacion:"—", detalle:"Comunicación de novedades de la promo progresiva de alfajores" },
];

// ─── GENERADOR DE ALERTAS ────────────────────────────────────────────────────
function generarAlertas() {
  const ahora = new Date();
  const hoy = ahora.toISOString().split("T")[0];
  const alertas = [];
  const todos = [...PROMOS, ...BANNERS];

  todos.forEach(item => {
    const esPromo = !!item.tipo;
    const tipoLabel = esPromo ? "Promoción" : "Espacio";

    if (item.estado === "alerta") {
      alertas.push({
        id: `alerta-cob-${item.id}`, tipo: "cobertura_baja", prioridad: "alta",
        titulo: `Cobertura baja — ${item.nombre}`,
        descripcion: `${tipoLabel} con ${item.cobertura}% de cobertura. ${(item.pdvsSegmento - item.pdvsAlcanzados).toLocaleString("es-AR")} PDVs sin recibir el contenido.`,
        item: item.id, hora: "hace 12 min", leida: false,
      });
    }
    if (item.estado === "activo" && item.cobertura === 0) {
      alertas.push({
        id: `alerta-falla-${item.id}`, tipo: "falla_total", prioridad: "critica",
        titulo: `⛔ Falla total — ${item.nombre}`,
        descripcion: `${tipoLabel} activo pero ningún PDV está recibiendo el contenido.`,
        item: item.id, hora: "hace 3 min", leida: false,
      });
    }
    if (item.inicio === hoy && item.estado === "activo") {
      alertas.push({
        id: `alerta-act-${item.id}`, tipo: "activacion", prioridad: "info",
        titulo: `✅ Activado hoy — ${item.nombre}`,
        descripcion: `${tipoLabel} activado correctamente para "${item.audiencia}" (${item.pdvsAlcanzados.toLocaleString("es-AR")} PDVs).`,
        item: item.id, hora: "hoy a las 00:01", leida: false,
      });
    }
    if (item.fin === hoy) {
      alertas.push({
        id: `alerta-venc-${item.id}`, tipo: "vencimiento", prioridad: "media",
        titulo: `⏰ Vence hoy — ${item.nombre}`,
        descripcion: `${tipoLabel} vence al final del día. Revisá si debe renovarse.`,
        item: item.id, hora: "hoy", leida: false,
      });
    }
  });
  return alertas;
}

// ─── CONSTANTES VISUALES ─────────────────────────────────────────────────────
const tipoConfig  = { "Regular":{"color":"#6366f1","bg":"#ede9fe"}, "Más por Menos":{"color":"#0ea5e9","bg":"#e0f2fe"}, "Progresiva":{"color":"#8b5cf6","bg":"#f5f3ff"} };
const estadoConfig= { activo:{"label":"Activo","color":"#16a34a","bg":"#f0fdf4","dot":"#16a34a"}, alerta:{"label":"Alerta cobertura","color":"#d97706","bg":"#fffbeb","dot":"#d97706"}, inactivo:{"label":"Programado","color":"#64748b","bg":"#f8fafc","dot":"#64748b"} };
const prioConfig  = { critica:{"color":"#dc2626","bg":"#fef2f2","label":"Crítica"}, alta:{"color":"#d97706","bg":"#fffbeb","label":"Alta"}, media:{"color":"#6366f1","bg":"#ede9fe","label":"Media"}, info:{"color":"#16a34a","bg":"#f0fdf4","label":"Info"} };

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function generarPdvsFallidos(item) {
  const cantidad = item.pdvsSegmento - item.pdvsAlcanzados;
  const distribuidores = ["Distribuidora Norte SA","Logística Sur SRL","Reparto Centro SA","Dist. Litoral SRL","Transportes del Este SA"];
  const dominios = ["gmail.com","hotmail.com","yahoo.com.ar","outlook.com"];
  return Array.from({ length: cantidad }, (_, i) => {
    const seed = i + item.id.charCodeAt(item.id.length - 1);
    const tokinNum = String((seed % 180) + 1).padStart(4,"0");
    const refNum   = String(10000 + ((seed * 37) % 89999));
    return { refseller:`RS-${refNum}`, idpdv:`tokin${tokinNum}`, seller:distribuidores[seed % distribuidores.length], mail:`pdv${refNum}@${dominios[(seed*3)%dominios.length]}` };
  });
}

function descargarCSV(item) {
  const pdvs = generarPdvsFallidos(item);
  const csv = ["refseller,idpdv,seller,mail", ...pdvs.map(p=>`${p.refseller},${p.idpdv},"${p.seller}",${p.mail}`)].join("\n");
  const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(new Blob([csv],{type:"text/csv"})), download:`pdvs_fallidos_${item.id}_${item.inicio}.csv` });
  a.click();
}

// ─── COMPONENTES BASE ────────────────────────────────────────────────────────
function CoverageBar({ value, estado }) {
  const color = estado==="alerta"?"#f59e0b":estado==="inactivo"?"#cbd5e1":"#6366f1";
  return (
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      <div style={{flex:1,height:6,background:"#e2e8f0",borderRadius:99,overflow:"hidden"}}>
        <div style={{width:`${value}%`,height:"100%",background:color,borderRadius:99,transition:"width 0.6s ease"}}/>
      </div>
      <span style={{fontSize:13,fontWeight:700,color,minWidth:36,textAlign:"right"}}>{value}%</span>
    </div>
  );
}

function Badge({ estado }) {
  const c = estadoConfig[estado];
  return <span style={{display:"inline-flex",alignItems:"center",gap:5,padding:"3px 10px",borderRadius:99,background:c.bg,fontSize:12,fontWeight:600,color:c.color,border:`1px solid ${c.color}33`,whiteSpace:"nowrap"}}><span style={{width:6,height:6,borderRadius:"50%",background:c.dot,display:"inline-block"}}/>{c.label}</span>;
}

function TipoBadge({ tipo }) {
  const c = tipoConfig[tipo]||{color:"#64748b",bg:"#f1f5f9"};
  return <span style={{display:"inline-block",padding:"2px 8px",borderRadius:6,background:c.bg,fontSize:11,fontWeight:700,color:c.color}}>{tipo}</span>;
}

function KPICard({ label, value, sub, accent }) {
  return (
    <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,padding:"18px 22px",flex:1,minWidth:130}}>
      <div style={{fontSize:11,color:"#94a3b8",fontWeight:600,letterSpacing:"0.05em",textTransform:"uppercase",marginBottom:6}}>{label}</div>
      <div style={{fontSize:26,fontWeight:800,color:accent||"#1e293b",lineHeight:1}}>{value}</div>
      {sub&&<div style={{fontSize:12,color:"#64748b",marginTop:4}}>{sub}</div>}
    </div>
  );
}

// ─── CENTRO DE NOTIFICACIONES ────────────────────────────────────────────────
function CampanaNotificaciones({ alertas, onMarcarLeida, onMarcarTodas, userMail }) {
  const [open, setOpen] = useState(false);
  const [mailEnviado, setMailEnviado] = useState(null);
  const ref = useRef();
  const noLeidas = alertas.filter(a => !a.leida).length;

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const simularMail = (alerta) => {
    setMailEnviado(alerta.id);
    setTimeout(() => setMailEnviado(null), 2500);
  };

  return (
    <div ref={ref} style={{position:"relative"}}>
      <button onClick={() => setOpen(!open)} style={{position:"relative",background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:10,padding:"8px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontSize:18}}>
        🔔
        {noLeidas > 0 && (
          <span style={{position:"absolute",top:-6,right:-6,background:"#dc2626",color:"#fff",borderRadius:99,fontSize:10,fontWeight:800,minWidth:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 4px"}}>
            {noLeidas}
          </span>
        )}
      </button>

      {open && (
        <div style={{position:"absolute",right:0,top:"calc(100% + 8px)",width:400,background:"#fff",border:"1px solid #e2e8f0",borderRadius:16,boxShadow:"0 8px 32px rgba(0,0,0,0.12)",zIndex:100,overflow:"hidden"}}>
          {/* Header panel */}
          <div style={{padding:"14px 18px",borderBottom:"1px solid #f1f5f9",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div>
              <div style={{fontWeight:700,fontSize:15,color:"#1e293b"}}>Notificaciones</div>
              <div style={{fontSize:12,color:"#94a3b8",marginTop:2}}>Enviadas a {userMail}</div>
            </div>
            {noLeidas > 0 && (
              <button onClick={onMarcarTodas} style={{fontSize:12,color:"#6366f1",background:"none",border:"none",cursor:"pointer",fontWeight:600}}>
                Marcar todas como leídas
              </button>
            )}
          </div>

          {/* Lista */}
          <div style={{maxHeight:380,overflowY:"auto"}}>
            {alertas.length === 0 && (
              <div style={{padding:32,textAlign:"center",color:"#94a3b8",fontSize:14}}>Sin notificaciones</div>
            )}
            {alertas.map(a => {
              const pc = prioConfig[a.prioridad];
              return (
                <div key={a.id} style={{padding:"14px 18px",borderBottom:"1px solid #f8fafc",background:a.leida?"#fff":"#fafbff",display:"flex",gap:12,alignItems:"flex-start"}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:a.leida?"#e2e8f0":pc.color,marginTop:5,flexShrink:0}}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:a.leida?500:700,color:"#1e293b",lineHeight:1.3}}>{a.titulo}</div>
                    <div style={{fontSize:12,color:"#64748b",marginTop:3,lineHeight:1.4}}>{a.descripcion}</div>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginTop:8}}>
                      <span style={{fontSize:11,color:"#94a3b8"}}>{a.hora}</span>
                      <span style={{display:"inline-block",padding:"1px 7px",borderRadius:99,background:pc.bg,color:pc.color,fontSize:10,fontWeight:700}}>{pc.label}</span>
                      <button onClick={() => { simularMail(a); onMarcarLeida(a.id); }}
                        style={{fontSize:11,color:"#6366f1",background:"none",border:"none",cursor:"pointer",fontWeight:600,padding:0}}>
                        {mailEnviado === a.id ? "✅ Mail enviado" : "📧 Reenviar mail"}
                      </button>
                      {!a.leida && <button onClick={() => onMarcarLeida(a.id)} style={{fontSize:11,color:"#94a3b8",background:"none",border:"none",cursor:"pointer",padding:0}}>Marcar leída</button>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div style={{padding:"10px 18px",borderTop:"1px solid #f1f5f9",background:"#f8fafc",fontSize:12,color:"#94a3b8",textAlign:"center"}}>
            Las alertas se envían automáticamente a <strong>{userMail}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ROW ─────────────────────────────────────────────────────────────────────
function Row({ item, tipo }) {
  const [open, setOpen] = useState(false);
  const pdvsFallidos = item.pdvsSegmento - item.pdvsAlcanzados;
  return (
    <>
      <tr onClick={() => setOpen(!open)} style={{cursor:"pointer",borderBottom:"1px solid #f1f5f9",transition:"background 0.15s"}}
        onMouseEnter={e=>e.currentTarget.style.background="#f8fafc"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
        <td style={{padding:"14px 16px"}}>
          <div style={{fontWeight:600,fontSize:14,color:"#1e293b"}}>{item.nombre}</div>
          <div style={{fontSize:12,color:"#94a3b8",marginTop:3,display:"flex",alignItems:"center",gap:6}}>
            <span>{item.id}</span><span style={{color:"#e2e8f0"}}>·</span>
            {tipo==="promo" ? <><TipoBadge tipo={item.tipo}/><span style={{color:"#cbd5e1"}}>·</span><span>{item.subtipo}</span></> : <span style={{fontWeight:500,color:"#6366f1"}}>{item.espacio}</span>}
          </div>
        </td>
        <td style={{padding:"14px 16px"}}><Badge estado={item.estado}/></td>
        <td style={{padding:"14px 16px"}}>
          <div style={{fontSize:13,color:"#1e293b",fontWeight:500}}>{item.audiencia}</div>
          <div style={{fontSize:12,color:"#94a3b8",marginTop:2}}>{item.pdvsSegmento.toLocaleString("es-AR")} PDVs</div>
        </td>
        <td style={{padding:"14px 16px",minWidth:160}}>
          <CoverageBar value={item.cobertura} estado={item.estado}/>
          {item.estado==="alerta" && <div style={{fontSize:11,color:"#d97706",marginTop:4,fontWeight:600}}>⚠ {pdvsFallidos.toLocaleString("es-AR")} PDVs sin cobertura</div>}
        </td>
        <td style={{padding:"14px 16px",fontSize:12,color:"#94a3b8",textAlign:"right",whiteSpace:"nowrap"}}>
          <div>{item.fin}</div><div style={{marginTop:2,color:"#cbd5e1"}}>{item.ultimaVerificacion}</div>
        </td>
        <td style={{padding:"14px 16px",textAlign:"center",color:"#cbd5e1",fontSize:14}}>{open?"▲":"▼"}</td>
      </tr>
      {open && (
        <tr style={{background:"#fafbff"}}>
          <td colSpan={6} style={{padding:"16px 24px",borderBottom:"1px solid #e2e8f0"}}>
            <div style={{display:"flex",gap:32,flexWrap:"wrap",alignItems:"flex-start"}}>
              <div><div style={{fontSize:11,color:"#94a3b8",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.07em"}}>Descripción</div><div style={{fontSize:14,color:"#1e293b",marginTop:2,maxWidth:280}}>{item.detalle}</div></div>
              <div><div style={{fontSize:11,color:"#94a3b8",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.07em"}}>Vigencia</div><div style={{fontSize:14,color:"#1e293b",marginTop:2}}>{item.inicio} → {item.fin}</div></div>
              <div><div style={{fontSize:11,color:"#94a3b8",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.07em"}}>PDVs en audiencia</div><div style={{fontSize:14,color:"#1e293b",marginTop:2}}>{item.pdvsSegmento.toLocaleString("es-AR")}</div></div>
              <div><div style={{fontSize:11,color:"#94a3b8",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.07em"}}>PDVs alcanzados</div>
                <div style={{fontSize:14,marginTop:2,fontWeight:item.estado==="alerta"?700:400,color:item.estado==="alerta"?"#d97706":"#1e293b"}}>
                  {item.pdvsAlcanzados.toLocaleString("es-AR")}{item.estado==="alerta"&&<span style={{marginLeft:6,fontSize:12}}>⚠ Brecha</span>}
                </div>
              </div>
              <div><div style={{fontSize:11,color:"#94a3b8",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.07em"}}>Última verificación</div><div style={{fontSize:14,color:"#1e293b",marginTop:2}}>{item.ultimaVerificacion}</div></div>
            </div>
            {item.estado==="alerta" && (
              <div style={{marginTop:20,background:"#fffbeb",border:"1px solid #fde68a",borderRadius:10,padding:"14px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
                <div>
                  <div style={{fontWeight:700,color:"#92400e",fontSize:14}}>⚠ {pdvsFallidos.toLocaleString("es-AR")} PDVs no recibieron este contenido</div>
                  <div style={{fontSize:12,color:"#b45309",marginTop:3}}>Descargá el listado para identificar y escalar los puntos de venta con falla.</div>
                </div>
                <button onClick={e=>{e.stopPropagation();descargarCSV(item);}}
                  style={{display:"flex",alignItems:"center",gap:8,background:"#d97706",color:"#fff",border:"none",borderRadius:8,padding:"9px 18px",fontSize:13,fontWeight:700,cursor:"pointer"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#b45309"} onMouseLeave={e=>e.currentTarget.style.background="#d97706"}>
                  ⬇ Descargar PDVs fallidos (.csv)
                </button>
              </div>
            )}
            {item.cobertura===100 && item.estado==="activo" && (
              <div style={{marginTop:20,background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:10,padding:"12px 18px",display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:18}}>✅</span>
                <div style={{fontSize:13,color:"#166534",fontWeight:600}}>Cobertura completa — los {item.pdvsAlcanzados.toLocaleString("es-AR")} PDVs de la audiencia están recibiendo este contenido correctamente.</div>
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  );
}

// ─── TAB CONTENT ─────────────────────────────────────────────────────────────
function TabContent({ data, tipo, filtro }) {
  const [busqueda, setBusqueda] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("todos");
  const tiposPromo   = ["todos","Regular","Más por Menos","Progresiva"];
  const tiposBanner  = ["todos","Landing Tematizada","Pop Up","Banner Hero","Banner Search","Banner Cart","Banner Novedades","Top Bar"];
  const tiposActuales= tipo==="promo"?tiposPromo:tiposBanner;

  const filtered = data
    .filter(d=>filtro==="todos"||d.estado===filtro)
    .filter(d=>tipoFiltro==="todos"||(tipo==="promo"?d.tipo===tipoFiltro:d.espacio===tipoFiltro))
    .filter(d=>{ if(!busqueda)return true; const q=busqueda.toLowerCase(); return d.nombre.toLowerCase().includes(q)||d.audiencia.toLowerCase().includes(q)||d.id.toLowerCase().includes(q)||(d.detalle&&d.detalle.toLowerCase().includes(q)); });

  const activos  = data.filter(d=>d.estado==="activo").length;
  const alertas  = data.filter(d=>d.estado==="alerta").length;
  const programados = data.filter(d=>d.estado==="inactivo").length;
  const totalPdvs= data.filter(d=>d.estado==="activo").reduce((a,d)=>a+d.pdvsAlcanzados,0);
  const cobProm  = Math.round(data.filter(d=>d.estado==="activo").reduce((a,d)=>a+d.cobertura,0)/(activos||1));

  return (
    <div>
      <div style={{display:"flex",gap:12,marginBottom:24,flexWrap:"wrap"}}>
        <KPICard label="Activos ahora"    value={activos}   accent="#6366f1"/>
        <KPICard label="Con alerta"       value={alertas}   accent={alertas>0?"#d97706":"#16a34a"} sub={alertas>0?"Cobertura incompleta":"Todo OK"}/>
        <KPICard label="Programados"      value={programados} accent="#94a3b8" sub="próximos a activar"/>
        <KPICard label="PDVs activos"     value={totalPdvs.toLocaleString("es-AR")} accent="#0ea5e9" sub="recibiendo contenido"/>
        <KPICard label="Cobertura prom."  value={`${cobProm}%`} accent={cobProm<90?"#d97706":"#16a34a"} sub="sobre activos"/>
      </div>

      <div style={{display:"flex",gap:12,marginBottom:16,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{position:"relative",flex:1,minWidth:220}}>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#94a3b8",fontSize:15,pointerEvents:"none"}}>🔍</span>
          <input type="text" placeholder={tipo==="promo"?"Buscar por nombre, audiencia o ID...":"Buscar por nombre, espacio o audiencia..."} value={busqueda}
            onChange={e=>setBusqueda(e.target.value)}
            style={{width:"100%",padding:"9px 12px 9px 36px",border:"1px solid #e2e8f0",borderRadius:10,fontSize:14,color:"#1e293b",background:"#fff",outline:"none",boxSizing:"border-box"}}
            onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {tiposActuales.map(t=>(
            <button key={t} onClick={()=>setTipoFiltro(t)}
              style={{padding:"7px 13px",border:`1px solid ${tipoFiltro===t?"#6366f1":"#e2e8f0"}`,borderRadius:8,background:tipoFiltro===t?"#ede9fe":"#fff",color:tipoFiltro===t?"#6366f1":"#64748b",fontSize:13,fontWeight:tipoFiltro===t?600:400,cursor:"pointer",whiteSpace:"nowrap"}}>
              {t==="todos"?(tipo==="promo"?"Todos los tipos":"Todos los espacios"):t}
            </button>
          ))}
        </div>
      </div>

      {(busqueda||tipoFiltro!=="todos")&&(
        <div style={{fontSize:13,color:"#64748b",marginBottom:12}}>
          {filtered.length} resultado{filtered.length!==1?"s":""}
          {busqueda&&<span> para <strong>"{busqueda}"</strong></span>}
          {tipoFiltro!=="todos"&&<span> · tipo <strong>{tipoFiltro}</strong></span>}
          <button onClick={()=>{setBusqueda("");setTipoFiltro("todos");}} style={{marginLeft:10,color:"#6366f1",background:"none",border:"none",cursor:"pointer",fontSize:13,fontWeight:600}}>Limpiar filtros</button>
        </div>
      )}

      <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead>
            <tr style={{background:"#f8fafc",borderBottom:"1px solid #e2e8f0"}}>
              {[tipo==="promo"?"Promoción":"Espacio publicitario","Estado","Audiencia","Cobertura PDVs","Vence · Verificado",""].map((h,i)=>(
                <th key={i} style={{padding:"12px 16px",textAlign:i===4?"right":"left",fontSize:11,color:"#94a3b8",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em"}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(item=><Row key={item.id} item={item} tipo={tipo}/>)}
          </tbody>
        </table>
        {filtered.length===0&&<div style={{padding:48,textAlign:"center",color:"#94a3b8",fontSize:14}}>No hay ítems con este filtro.</div>}
      </div>
    </div>
  );
}

// ─── LOGIN ───────────────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]   = useState("");
  const [verPass, setVerPass] = useState(false);
  const handleSubmit = () => {
    const u = USUARIOS.find(u=>u.usuario===usuario.trim()&&u.password===password);
    if(u){onLogin(u);}else{setError("Usuario o contraseña incorrectos.");}
  };
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#ede9fe 0%,#e0f2fe 100%)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Inter',system-ui,sans-serif"}}>
      <div style={{background:"#fff",borderRadius:20,padding:"48px 44px",width:"100%",maxWidth:400,boxShadow:"0 8px 40px rgba(99,102,241,0.10)"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:32}}>
          <div style={{width:42,height:42,borderRadius:12,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>◎</div>
          <div>
            <div style={{fontSize:17,fontWeight:800,color:"#1e293b",letterSpacing:"-0.02em"}}>Panel de Verdad Única</div>
            <div style={{fontSize:12,color:"#94a3b8"}}>Acceso interno</div>
          </div>
        </div>
        <div style={{marginBottom:16}}>
          <label style={{fontSize:13,fontWeight:600,color:"#374151",display:"block",marginBottom:6}}>Usuario</label>
          <input type="text" value={usuario} onChange={e=>{setUsuario(e.target.value);setError("");}} onKeyDown={e=>e.key==="Enter"&&handleSubmit()} placeholder="Tu usuario"
            style={{width:"100%",padding:"11px 14px",border:`1px solid ${error?"#fca5a5":"#e2e8f0"}`,borderRadius:10,fontSize:14,color:"#1e293b",outline:"none",boxSizing:"border-box"}}
            onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
        </div>
        <div style={{marginBottom:8}}>
          <label style={{fontSize:13,fontWeight:600,color:"#374151",display:"block",marginBottom:6}}>Contraseña</label>
          <div style={{position:"relative"}}>
            <input type={verPass?"text":"password"} value={password} onChange={e=>{setPassword(e.target.value);setError("");}} onKeyDown={e=>e.key==="Enter"&&handleSubmit()} placeholder="Tu contraseña"
              style={{width:"100%",padding:"11px 40px 11px 14px",border:`1px solid ${error?"#fca5a5":"#e2e8f0"}`,borderRadius:10,fontSize:14,color:"#1e293b",outline:"none",boxSizing:"border-box"}}
              onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
            <button onClick={()=>setVerPass(!verPass)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#94a3b8",fontSize:15}}>{verPass?"🙈":"👁"}</button>
          </div>
        </div>
        {error&&<div style={{fontSize:13,color:"#dc2626",fontWeight:500,marginBottom:12,padding:"8px 12px",background:"#fef2f2",borderRadius:8,border:"1px solid #fecaca"}}>{error}</div>}
        <button onClick={handleSubmit}
          style={{width:"100%",padding:"12px",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",border:"none",borderRadius:10,fontSize:15,fontWeight:700,cursor:"pointer",marginTop:8}}
          onMouseEnter={e=>e.currentTarget.style.opacity="0.9"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
          Ingresar
        </button>

      </div>
    </div>
  );
}

// ─── RESUMEN SEMANAL ─────────────────────────────────────────────────────────
function ResumenSemanal({ userMail }) {
  const [semana, setSemana] = useState(0); // 0 = semana actual, -1 = anterior
  const [mailEnviado, setMailEnviado] = useState(false);

  const semanas = [
    {
      label: "Esta semana",
      rango: "16 jun – 22 jun 2026",
      kpis: { activos: 9, alertas: 4, coberturaProm: 82, pdvsAlcanzados: 19840, itemsNuevos: 3, itemsVencidos: 1 },
      nuevos: [
        { id:"PROMO-003", nombre:"Progresiva Lácteos",          tipo:"Promoción",  estado:"alerta",   cobertura:40  },
        { id:"BAN-003",   nombre:"Hero — Campaña Snacks",       tipo:"Banner",     estado:"activo",   cobertura:100 },
        { id:"BAN-004",   nombre:"Top Bar — Novedad Progresiva",tipo:"Banner",     estado:"activo",   cobertura:100 },
      ],
      vencidos: [
        { id:"PROMO-X01", nombre:"15% OFF Bebidas Invierno",    tipo:"Promoción",  coberturaFinal:97 },
      ],
      alertasCriticas: [
        { titulo:"Cobertura baja — Progresiva Lácteos",          descripcion:"40% de cobertura · 310 PDVs sin recibir el contenido", prioridad:"alta"    },
        { titulo:"Cobertura baja — Pop Up Acuerdo Comercial XYZ",descripcion:"60% de cobertura · 840 PDVs sin recibir el contenido", prioridad:"alta"    },
        { titulo:"Cobertura baja — Banner Search Lácteos",       descripcion:"60% de cobertura · 208 PDVs sin recibir el contenido", prioridad:"alta"    },
        { titulo:"Cobertura baja — 3x2 en Snacks",              descripcion:"90% de cobertura · 380 PDVs sin recibir el contenido", prioridad:"media"   },
      ],
    },
    {
      label: "Semana anterior",
      rango: "9 jun – 15 jun 2026",
      kpis: { activos: 7, alertas: 2, coberturaProm: 94, pdvsAlcanzados: 21300, itemsNuevos: 4, itemsVencidos: 2 },
      nuevos: [
        { id:"PROMO-001", nombre:"20% OFF Gaseosas",            tipo:"Promoción",  estado:"activo",   cobertura:100 },
        { id:"PROMO-005", nombre:"Progresiva Alfajores",        tipo:"Promoción",  estado:"activo",   cobertura:100 },
        { id:"BAN-001",   nombre:"Landing Invierno 2026",       tipo:"Banner",     estado:"activo",   cobertura:100 },
        { id:"BAN-006",   nombre:"Banner Cart — Gaseosas",      tipo:"Banner",     estado:"activo",   cobertura:100 },
      ],
      vencidos: [
        { id:"PROMO-X02", nombre:"2x1 Yerba Mate",              tipo:"Promoción",  coberturaFinal:100 },
        { id:"BAN-X01",   nombre:"Banner Hero — Día del Padre", tipo:"Banner",     coberturaFinal:100 },
      ],
      alertasCriticas: [
        { titulo:"Cobertura baja — Landing Invierno",           descripcion:"88% de cobertura · 1488 PDVs sin recibir el contenido", prioridad:"media" },
        { titulo:"Falla puntual — Banner Cart Gaseosas",        descripcion:"Resuelto a las 2hs del inicio",                        prioridad:"media" },
      ],
    },
  ];

  const s = semanas[semana === 0 ? 0 : 1];
  const { kpis, nuevos, vencidos, alertasCriticas } = s;

  const simularMail = () => {
    setMailEnviado(true);
    setTimeout(() => setMailEnviado(false), 3000);
  };

  const colorCobertura = v => v >= 95 ? "#16a34a" : v >= 80 ? "#d97706" : "#dc2626";
  const bgCobertura    = v => v >= 95 ? "#f0fdf4"  : v >= 80 ? "#fffbeb" : "#fef2f2";

  return (
    <div>
      {/* Selector de semana + acción */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <div style={{display:"flex",gap:8}}>
          {[0,1].map(i => (
            <button key={i} onClick={()=>setSemana(i)}
              style={{padding:"7px 16px",border:`1px solid ${semana===i?"#6366f1":"#e2e8f0"}`,borderRadius:8,background:semana===i?"#ede9fe":"#fff",color:semana===i?"#6366f1":"#64748b",fontSize:13,fontWeight:semana===i?700:400,cursor:"pointer"}}>
              {semanas[i].label}
            </button>
          ))}
        </div>
        <button onClick={simularMail}
          style={{display:"flex",alignItems:"center",gap:8,background:mailEnviado?"#16a34a":"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",border:"none",borderRadius:10,padding:"9px 20px",fontSize:13,fontWeight:700,cursor:"pointer",transition:"all 0.3s"}}>
          {mailEnviado ? "✅ Resumen enviado" : "📧 Enviar resumen al equipo"}
        </button>
      </div>

      {/* Encabezado del resumen */}
      <div style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)",borderRadius:16,padding:"24px 28px",marginBottom:20,color:"#fff"}}>
        <div style={{fontSize:12,fontWeight:600,opacity:0.8,letterSpacing:"0.06em",textTransform:"uppercase"}}>Resumen semanal · PVU</div>
        <div style={{fontSize:22,fontWeight:800,marginTop:4,letterSpacing:"-0.02em"}}>{s.rango}</div>
        <div style={{fontSize:13,opacity:0.75,marginTop:4}}>Enviado automáticamente a {userMail}</div>
      </div>

      {/* KPIs */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:20}}>
        {[
          { label:"Ítems activos",       value:kpis.activos,                      accent:"#6366f1", sub:"en la plataforma" },
          { label:"Alertas disparadas",  value:kpis.alertas,                      accent:kpis.alertas>2?"#dc2626":"#d97706", sub:"durante la semana" },
          { label:"Cobertura promedio",  value:`${kpis.coberturaProm}%`,          accent:colorCobertura(kpis.coberturaProm), sub:"sobre ítems activos" },
          { label:"PDVs alcanzados",     value:kpis.pdvsAlcanzados.toLocaleString("es-AR"), accent:"#0ea5e9", sub:"recibieron contenido" },
          { label:"Nuevos esta semana",  value:kpis.itemsNuevos,                  accent:"#16a34a", sub:"promos o banners" },
          { label:"Vencidos esta semana",value:kpis.itemsVencidos,                accent:"#94a3b8", sub:"finalizados" },
        ].map(k => (
          <div key={k.label} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:"16px 18px"}}>
            <div style={{fontSize:11,color:"#94a3b8",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:6}}>{k.label}</div>
            <div style={{fontSize:24,fontWeight:800,color:k.accent,lineHeight:1}}>{k.value}</div>
            <div style={{fontSize:11,color:"#64748b",marginTop:4}}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
        {/* Nuevos */}
        <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,overflow:"hidden"}}>
          <div style={{padding:"14px 18px",borderBottom:"1px solid #f1f5f9",fontWeight:700,fontSize:14,color:"#1e293b",display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:16}}>✅</span> Activados esta semana
          </div>
          {nuevos.map(i => (
            <div key={i.id} style={{padding:"12px 18px",borderBottom:"1px solid #f8fafc",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:"#1e293b"}}>{i.nombre}</div>
                <div style={{fontSize:11,color:"#94a3b8",marginTop:2}}>{i.tipo} · {i.id}</div>
              </div>
              <div style={{background:bgCobertura(i.cobertura),border:`1px solid ${colorCobertura(i.cobertura)}44`,borderRadius:8,padding:"3px 10px",fontSize:12,fontWeight:700,color:colorCobertura(i.cobertura),whiteSpace:"nowrap"}}>
                {i.cobertura}%
              </div>
            </div>
          ))}
        </div>

        {/* Vencidos */}
        <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,overflow:"hidden"}}>
          <div style={{padding:"14px 18px",borderBottom:"1px solid #f1f5f9",fontWeight:700,fontSize:14,color:"#1e293b",display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:16}}>⏰</span> Vencidos esta semana
          </div>
          {vencidos.map(i => (
            <div key={i.id} style={{padding:"12px 18px",borderBottom:"1px solid #f8fafc",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:"#1e293b"}}>{i.nombre}</div>
                <div style={{fontSize:11,color:"#94a3b8",marginTop:2}}>{i.tipo} · {i.id}</div>
              </div>
              <div style={{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:8,padding:"3px 10px",fontSize:12,fontWeight:700,color:"#64748b",whiteSpace:"nowrap"}}>
                {i.coberturaFinal}% final
              </div>
            </div>
          ))}
          {vencidos.length===0 && <div style={{padding:24,textAlign:"center",color:"#94a3b8",fontSize:13}}>Ninguno esta semana</div>}
        </div>
      </div>

      {/* Alertas críticas */}
      <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,overflow:"hidden"}}>
        <div style={{padding:"14px 18px",borderBottom:"1px solid #f1f5f9",fontWeight:700,fontSize:14,color:"#1e293b",display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:16}}>⚠</span> Alertas de la semana
        </div>
        {alertasCriticas.map((a,i) => {
          const pc = prioConfig[a.prioridad];
          return (
            <div key={i} style={{padding:"12px 18px",borderBottom:"1px solid #f8fafc",display:"flex",gap:12,alignItems:"flex-start"}}>
              <span style={{display:"inline-block",padding:"2px 8px",borderRadius:99,background:pc.bg,color:pc.color,fontSize:11,fontWeight:700,whiteSpace:"nowrap",marginTop:2}}>{pc.label}</span>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:"#1e293b"}}>{a.titulo}</div>
                <div style={{fontSize:12,color:"#64748b",marginTop:2}}>{a.descripcion}</div>
              </div>
            </div>
          );
        })}
        {alertasCriticas.length===0 && <div style={{padding:24,textAlign:"center",color:"#16a34a",fontSize:13,fontWeight:600}}>✅ Sin alertas esta semana</div>}
      </div>
    </div>
  );
}

// ─── CALENDARIO ──────────────────────────────────────────────────────────────
const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const DIAS_SEMANA = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];

const COLORES_TIPO = {
  "Regular":           { bg:"#ede9fe", border:"#6366f1", text:"#4338ca" },
  "Más por Menos":     { bg:"#e0f2fe", border:"#0ea5e9", text:"#0369a1" },
  "Progresiva":        { bg:"#f5f3ff", border:"#8b5cf6", text:"#6d28d9" },
  "Landing Tematizada":{ bg:"#fef9c3", border:"#eab308", text:"#854d0e" },
  "Pop Up":            { bg:"#fce7f3", border:"#ec4899", text:"#9d174d" },
  "Banner Hero":       { bg:"#ffedd5", border:"#f97316", text:"#9a3412" },
  "Banner Search":     { bg:"#d1fae5", border:"#10b981", text:"#065f46" },
  "Banner Cart":       { bg:"#e0f2fe", border:"#38bdf8", text:"#075985" },
  "Banner Novedades":  { bg:"#f1f5f9", border:"#64748b", text:"#334155" },
  "Top Bar":           { bg:"#fdf2f8", border:"#d946ef", text:"#86198f" },
};

function CalendarioActivaciones() {
  const [mesActual, setMesActual] = useState({ year:2026, month:5 });
  const [itemSeleccionado, setItemSeleccionado] = useState(null);
  const [filtroTipo, setFiltroTipo] = useState("todos");

  const todos = [
    ...PROMOS.map(p => ({ ...p, categoria:"promo",  tipoVisual:p.tipo })),
    ...BANNERS.map(b => ({ ...b, categoria:"banner", tipoVisual:b.espacio })),
  ];

  const itemsFiltrados = todos.filter(i =>
    filtroTipo==="todos" ? true : filtroTipo==="promos" ? i.categoria==="promo" : i.categoria==="banner"
  );

  const diasEnMes  = new Date(mesActual.year, mesActual.month+1, 0).getDate();
  const offsetInicio = new Date(mesActual.year, mesActual.month, 1).getDay();

  const celdas = [];
  for (let i=0; i<offsetInicio; i++) celdas.push(null);
  for (let d=1; d<=diasEnMes; d++) celdas.push(d);

  const fechaStr = (y,m,d) => `${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;

  const itemsEnDia = dia => {
    if (!dia) return [];
    const f = fechaStr(mesActual.year, mesActual.month, dia);
    return itemsFiltrados.filter(i => i.inicio<=f && i.fin>=f);
  };

  const esSolapamiento = dia => {
    const items = itemsEnDia(dia);
    const audiencias = items.map(i=>i.audiencia);
    return [...new Set(audiencias)].some(a => audiencias.filter(x=>x===a).length>1);
  };

  const esHoy = dia => dia && fechaStr(mesActual.year, mesActual.month, dia)==="2026-06-23";

  const mesAnterior  = () => { setMesActual(p => p.month===0  ? {year:p.year-1,month:11} : {...p,month:p.month-1}); setItemSeleccionado(null); };
  const mesSiguiente = () => { setMesActual(p => p.month===11 ? {year:p.year+1,month:0}  : {...p,month:p.month+1}); setItemSeleccionado(null); };

  const proximas = todos.filter(i=>i.estado==="inactivo").sort((a,b)=>a.inicio.localeCompare(b.inicio)).slice(0,4);

  return (
    <div>
      {proximas.length>0 && (
        <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,padding:"18px 22px",marginBottom:20}}>
          <div style={{fontSize:13,fontWeight:700,color:"#1e293b",marginBottom:12}}>⚡ Próximas activaciones</div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            {proximas.map(i => {
              const c = COLORES_TIPO[i.tipoVisual]||{bg:"#f1f5f9",border:"#94a3b8",text:"#475569"};
              return (
                <div key={i.id} onClick={()=>setItemSeleccionado(i)}
                  style={{flex:1,minWidth:160,padding:"12px 14px",borderRadius:10,border:`1.5px solid ${c.border}`,background:c.bg,cursor:"pointer"}}>
                  <div style={{fontSize:12,fontWeight:700,color:c.text}}>{i.nombre}</div>
                  <div style={{fontSize:11,color:"#64748b",marginTop:4}}>Inicia: <strong>{i.inicio}</strong></div>
                  <div style={{fontSize:11,color:"#94a3b8"}}>{i.audiencia}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{display:"flex",gap:20,alignItems:"flex-start"}}>
        <div style={{flex:1,background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,overflow:"hidden"}}>
          {/* Header mes */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",borderBottom:"1px solid #f1f5f9"}}>
            <button onClick={mesAnterior}  style={{background:"none",border:"1px solid #e2e8f0",borderRadius:8,padding:"6px 12px",cursor:"pointer",fontSize:16,color:"#64748b"}}>‹</button>
            <div style={{fontWeight:700,fontSize:16,color:"#1e293b"}}>{MESES[mesActual.month]} {mesActual.year}</div>
            <button onClick={mesSiguiente} style={{background:"none",border:"1px solid #e2e8f0",borderRadius:8,padding:"6px 12px",cursor:"pointer",fontSize:16,color:"#64748b"}}>›</button>
          </div>

          {/* Filtros */}
          <div style={{display:"flex",gap:6,padding:"12px 20px",borderBottom:"1px solid #f1f5f9",flexWrap:"wrap",alignItems:"center"}}>
            {[["todos","Todos"],["promos","Solo Promos"],["banners","Solo Espacios"]].map(([id,label])=>(
              <button key={id} onClick={()=>setFiltroTipo(id)}
                style={{padding:"5px 12px",border:`1px solid ${filtroTipo===id?"#6366f1":"#e2e8f0"}`,borderRadius:8,background:filtroTipo===id?"#ede9fe":"#fff",color:filtroTipo===id?"#6366f1":"#64748b",fontSize:12,fontWeight:filtroTipo===id?700:400,cursor:"pointer"}}>
                {label}
              </button>
            ))}
            <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:6,fontSize:11,color:"#94a3b8"}}>
              <span style={{display:"inline-block",width:10,height:10,borderRadius:2,background:"#fef08a",border:"1px solid #eab308"}}/>
              Solapamiento de audiencia
            </div>
          </div>

          {/* Días semana */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",borderBottom:"1px solid #f1f5f9"}}>
            {DIAS_SEMANA.map(d=>(
              <div key={d} style={{padding:"8px 4px",textAlign:"center",fontSize:11,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em"}}>{d}</div>
            ))}
          </div>

          {/* Celdas */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)"}}>
            {celdas.map((dia,idx)=>{
              const items   = itemsEnDia(dia);
              const solap   = dia && esSolapamiento(dia);
              const hoyDia  = esHoy(dia);
              return (
                <div key={idx} style={{minHeight:90,padding:"6px 4px",borderRight:"1px solid #f8fafc",borderBottom:"1px solid #f8fafc",background:!dia?"#fafbfc":solap?"#fefce8":hoyDia?"#f0f9ff":"#fff",position:"relative"}}>
                  {dia && (
                    <>
                      <div style={{fontSize:12,fontWeight:hoyDia?800:400,color:hoyDia?"#6366f1":"#64748b",marginBottom:3,textAlign:"right",paddingRight:4}}>
                        {hoyDia
                          ? <span style={{background:"#6366f1",color:"#fff",borderRadius:"50%",width:20,height:20,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:11}}>{dia}</span>
                          : dia}
                      </div>
                      {items.slice(0,3).map(i=>{
                        const c = COLORES_TIPO[i.tipoVisual]||{bg:"#f1f5f9",border:"#94a3b8",text:"#475569"};
                        const esInicio = i.inicio===fechaStr(mesActual.year,mesActual.month,dia);
                        return (
                          <div key={i.id} onClick={()=>setItemSeleccionado(i)}
                            style={{fontSize:10,fontWeight:600,color:c.text,background:c.bg,border:`1px solid ${c.border}`,borderRadius:4,padding:"2px 5px",marginBottom:2,cursor:"pointer",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",borderLeft:esInicio?`3px solid ${c.border}`:undefined}}>
                            {esInicio?"▶ ":""}{i.nombre}
                          </div>
                        );
                      })}
                      {items.length>3 && <div style={{fontSize:10,color:"#94a3b8",paddingLeft:4}}>+{items.length-3} más</div>}
                      {solap && <div style={{position:"absolute",top:4,left:4,fontSize:10}}>⚠</div>}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Panel lateral detalle */}
        {itemSeleccionado ? (
          <div className="cal-sidebar" style={{width:280,background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,padding:"20px",flexShrink:0}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
              <div style={{fontSize:14,fontWeight:700,color:"#1e293b",lineHeight:1.3,maxWidth:220}}>{itemSeleccionado.nombre}</div>
              <button onClick={()=>setItemSeleccionado(null)} style={{background:"none",border:"none",cursor:"pointer",color:"#94a3b8",fontSize:18,lineHeight:1}}>×</button>
            </div>
            {(()=>{
              const c=COLORES_TIPO[itemSeleccionado.tipoVisual]||{bg:"#f1f5f9",border:"#94a3b8",text:"#475569"};
              return <span style={{display:"inline-block",padding:"3px 10px",borderRadius:99,background:c.bg,color:c.text,fontSize:12,fontWeight:700,border:`1px solid ${c.border}`,marginBottom:14}}>{itemSeleccionado.tipoVisual}</span>;
            })()}
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {[
                ["Estado",         <span style={{color:estadoConfig[itemSeleccionado.estado].color,fontWeight:700}}>{estadoConfig[itemSeleccionado.estado].label}</span>],
                ["Vigencia",       `${itemSeleccionado.inicio} → ${itemSeleccionado.fin}`],
                ["Audiencia",      itemSeleccionado.audiencia],
                ["PDVs segmento",  itemSeleccionado.pdvsSegmento.toLocaleString("es-AR")],
                ["PDVs alcanzados",itemSeleccionado.pdvsAlcanzados.toLocaleString("es-AR")],
                ["Cobertura",      `${itemSeleccionado.cobertura}%`],
                ["Descripción",    itemSeleccionado.detalle],
              ].map(([label,val])=>(
                <div key={label}>
                  <div style={{fontSize:11,color:"#94a3b8",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em"}}>{label}</div>
                  <div style={{fontSize:13,color:"#1e293b",marginTop:2,lineHeight:1.5}}>{val}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:16}}><CoverageBar value={itemSeleccionado.cobertura} estado={itemSeleccionado.estado}/></div>
          </div>
        ) : (
          <div className="cal-sidebar" style={{width:280,background:"#f8fafc",border:"1px dashed #e2e8f0",borderRadius:14,padding:"24px 20px",flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",gap:8,minHeight:200}}>
            <div style={{fontSize:24}}>👆</div>
            <div style={{fontSize:13,color:"#94a3b8",lineHeight:1.5}}>Hacé click en cualquier ítem para ver el detalle</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── HISTORIAL DE CAMPAÑAS ───────────────────────────────────────────────────
const HISTORIAL_DATA = [
  { id:"PROMO-H001", nombre:"20% OFF Bebidas Invierno",        tipo:"Regular",       subtipo:"Descuento %",       categoria:"promo",  audiencia:"Kioscos del Litoral",               inicio:"2026-05-01", fin:"2026-05-31", pdvsSegmento:1240, pdvsAlcanzados:1203, cobertura:97, duracion:30, detalle:"Descuento en bebidas calientes para temporada invierno" },
  { id:"PROMO-H002", nombre:"2x1 Yerba Mate",                  tipo:"Más por Menos", subtipo:"2x1",               categoria:"promo",  audiencia:"Almacenes Cat. A y B1",             inicio:"2026-05-10", fin:"2026-05-20", pdvsSegmento:3800, pdvsAlcanzados:3800, cobertura:100, duracion:10, detalle:"2x1 en todas las marcas de yerba mate" },
  { id:"PROMO-H003", nombre:"Progresiva Galletitas",           tipo:"Progresiva",    subtipo:"10u→10% / 20u→25%", categoria:"promo",  audiencia:"Dietéticas GBA Norte",              inicio:"2026-05-15", fin:"2026-06-01", pdvsSegmento:520,  pdvsAlcanzados:468,  cobertura:90, duracion:17, detalle:"Descuento progresivo en galletitas premium" },
  { id:"PROMO-H004", nombre:"3x2 Jugos",                       tipo:"Más por Menos", subtipo:"3x2",               categoria:"promo",  audiencia:"Estaciones de Servicio YPF Propias",inicio:"2026-04-01", fin:"2026-04-30", pdvsSegmento:890,  pdvsAlcanzados:712,  cobertura:80, duracion:30, detalle:"3x2 en jugos de 1 litro seleccionados" },
  { id:"PROMO-H005", nombre:"15% OFF Chocolates",              tipo:"Regular",       subtipo:"Descuento %",       categoria:"promo",  audiencia:"Kioscos Acuerdo Comercial XYZ",     inicio:"2026-04-10", fin:"2026-04-20", pdvsSegmento:2100, pdvsAlcanzados:2100, cobertura:100, duracion:10, detalle:"15% en toda la línea de chocolates" },
  { id:"PROMO-H006", nombre:"4x3 Agua Mineral",                tipo:"Más por Menos", subtipo:"4x3",               categoria:"promo",  audiencia:"Establecimientos Educativos",        inicio:"2026-03-01", fin:"2026-03-31", pdvsSegmento:670,  pdvsAlcanzados:536,  cobertura:80, duracion:31, detalle:"4x3 en agua mineral 500ml" },
  { id:"BAN-H001",   nombre:"Landing Día de la Madre",         tipo:"Landing Tematizada", subtipo:"Landing",      categoria:"banner", audiencia:"Todos los PDVs",                    inicio:"2026-05-20", fin:"2026-05-26", pdvsSegmento:12400,pdvsAlcanzados:12400,cobertura:100, duracion:6,  detalle:"Landing especial para el día de la madre" },
  { id:"BAN-H002",   nombre:"Hero — Campaña Otoño",            tipo:"Banner Hero",   subtipo:"Hero",              categoria:"banner", audiencia:"Almacenes Cat. A y B1",             inicio:"2026-04-01", fin:"2026-05-31", pdvsSegmento:3800, pdvsAlcanzados:3496, cobertura:92, duracion:61, detalle:"Banner principal campaña otoño-invierno" },
  { id:"BAN-H003",   nombre:"Pop Up — Acuerdo Banco XYZ",      tipo:"Pop Up",        subtipo:"Pop Up",            categoria:"banner", audiencia:"Kioscos Acuerdo Comercial XYZ",     inicio:"2026-03-15", fin:"2026-04-15", pdvsSegmento:2100, pdvsAlcanzados:1680, cobertura:80, duracion:31, detalle:"Pop up de activación acuerdo banco" },
  { id:"BAN-H004",   nombre:"Top Bar — Semana Santa",          tipo:"Top Bar",       subtipo:"Top Bar",           categoria:"banner", audiencia:"Todos los PDVs",                    inicio:"2026-03-28", fin:"2026-04-02", pdvsSegmento:12400,pdvsAlcanzados:12400,cobertura:100, duracion:5,  detalle:"Comunicación especial semana santa" },
  { id:"BAN-H005",   nombre:"Banner Search — Yerba Mate",      tipo:"Banner Search", subtipo:"Search",            categoria:"banner", audiencia:"Almacenes Cat. A y B1",             inicio:"2026-05-10", fin:"2026-05-20", pdvsSegmento:3800, pdvsAlcanzados:2888, cobertura:76, duracion:10, detalle:"Banner en búsquedas de categoría infusiones" },
  { id:"BAN-H006",   nombre:"Banner Cart — Chocolates",        tipo:"Banner Cart",   subtipo:"Cart",              categoria:"banner", audiencia:"Kioscos Acuerdo Comercial XYZ",     inicio:"2026-04-10", fin:"2026-04-20", pdvsSegmento:2100, pdvsAlcanzados:2100, cobertura:100, duracion:10, detalle:"Banner en carrito recordando promo chocolates" },
];

function HistorialCampañas() {
  const [busqueda, setBusqueda]     = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [filtroPerf, setFiltroPerf] = useState("todos");
  const [orden, setOrden]           = useState("fecha");

  const colorCobertura = v => v===100?"#16a34a":v>=85?"#d97706":"#dc2626";
  const bgCobertura    = v => v===100?"#f0fdf4":v>=85?"#fffbeb":"#fef2f2";
  const labelPerf      = v => v===100?"Perfecta":v>=85?"Buena":"Con fallas";

  const descargarCSV = () => {
    const header = "id,nombre,tipo,categoria,audiencia,inicio,fin,duracion,pdvsSegmento,pdvsAlcanzados,cobertura";
    const filas = HISTORIAL_DATA.map(i =>
      `${i.id},"${i.nombre}","${i.tipo}","${i.categoria}","${i.audiencia}",${i.inicio},${i.fin},${i.duracion},${i.pdvsSegmento},${i.pdvsAlcanzados},${i.cobertura}%`
    );
    const csv = [header,...filas].join("\n");
    const a = Object.assign(document.createElement("a"),{href:URL.createObjectURL(new Blob([csv],{type:"text/csv"})),download:"historial_campanas_pvu.csv"});
    a.click();
  };

  const filtered = HISTORIAL_DATA
    .filter(i => filtroCategoria==="todos" || i.categoria===filtroCategoria)
    .filter(i => {
      if (filtroPerf==="todos") return true;
      if (filtroPerf==="perfecta") return i.cobertura===100;
      if (filtroPerf==="buena")    return i.cobertura>=85 && i.cobertura<100;
      if (filtroPerf==="fallas")   return i.cobertura<85;
    })
    .filter(i => {
      if (!busqueda) return true;
      const q = busqueda.toLowerCase();
      return i.nombre.toLowerCase().includes(q) || i.audiencia.toLowerCase().includes(q) || i.id.toLowerCase().includes(q);
    })
    .sort((a,b) => {
      if (orden==="fecha")     return b.inicio.localeCompare(a.inicio);
      if (orden==="cobertura") return b.cobertura - a.cobertura;
      if (orden==="duracion")  return b.duracion - a.duracion;
      if (orden==="pdvs")      return b.pdvsAlcanzados - a.pdvsAlcanzados;
      return 0;
    });

  // KPIs globales
  const total        = HISTORIAL_DATA.length;
  const cobProm      = Math.round(HISTORIAL_DATA.reduce((a,i)=>a+i.cobertura,0)/total);
  const perfectas    = HISTORIAL_DATA.filter(i=>i.cobertura===100).length;
  const conFallas    = HISTORIAL_DATA.filter(i=>i.cobertura<85).length;
  const totalPdvs    = HISTORIAL_DATA.reduce((a,i)=>a+i.pdvsAlcanzados,0);

  return (
    <div>
      {/* KPIs */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
        {[
          { label:"Campañas históricas", value:total,                              accent:"#6366f1" },
          { label:"Cobertura promedio",  value:`${cobProm}%`,                      accent:colorCobertura(cobProm) },
          { label:"Cobertura perfecta",  value:perfectas, sub:`${Math.round(perfectas/total*100)}% del total`, accent:"#16a34a" },
          { label:"PDVs totales",        value:totalPdvs.toLocaleString("es-AR"),  accent:"#0ea5e9", sub:"acumulado histórico" },
        ].map(k=>(
          <div key={k.label} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:"16px 18px"}}>
            <div style={{fontSize:11,color:"#94a3b8",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:6}}>{k.label}</div>
            <div style={{fontSize:24,fontWeight:800,color:k.accent,lineHeight:1}}>{k.value}</div>
            {k.sub && <div style={{fontSize:11,color:"#64748b",marginTop:4}}>{k.sub}</div>}
          </div>
        ))}
      </div>

      {/* Filtros y búsqueda */}
      <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,padding:"16px 20px",marginBottom:16}}>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
          {/* Buscador */}
          <div style={{position:"relative",flex:1,minWidth:200}}>
            <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#94a3b8",fontSize:15,pointerEvents:"none"}}>🔍</span>
            <input type="text" placeholder="Buscar campaña, audiencia o ID..." value={busqueda}
              onChange={e=>setBusqueda(e.target.value)}
              style={{width:"100%",padding:"8px 12px 8px 36px",border:"1px solid #e2e8f0",borderRadius:8,fontSize:13,outline:"none",boxSizing:"border-box"}}
              onFocus={e=>e.target.style.borderColor="#6366f1"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
          </div>

          {/* Categoria */}
          <div style={{display:"flex",gap:6}}>
            {[["todos","Todas"],["promo","Promos"],["banner","Banners"]].map(([id,label])=>(
              <button key={id} onClick={()=>setFiltroCategoria(id)}
                style={{padding:"6px 12px",border:`1px solid ${filtroCategoria===id?"#6366f1":"#e2e8f0"}`,borderRadius:8,background:filtroCategoria===id?"#ede9fe":"#fff",color:filtroCategoria===id?"#6366f1":"#64748b",fontSize:12,fontWeight:filtroCategoria===id?700:400,cursor:"pointer",whiteSpace:"nowrap"}}>
                {label}
              </button>
            ))}
          </div>

          {/* Performance */}
          <div style={{display:"flex",gap:6}}>
            {[["todos","Todas"],["perfecta","Perfecta 100%"],["buena","Buena ≥85%"],["fallas","Con fallas"]].map(([id,label])=>(
              <button key={id} onClick={()=>setFiltroPerf(id)}
                style={{padding:"6px 12px",border:`1px solid ${filtroPerf===id?"#6366f1":"#e2e8f0"}`,borderRadius:8,background:filtroPerf===id?"#ede9fe":"#fff",color:filtroPerf===id?"#6366f1":"#64748b",fontSize:12,fontWeight:filtroPerf===id?700:400,cursor:"pointer",whiteSpace:"nowrap"}}>
                {label}
              </button>
            ))}
          </div>

          {/* Ordenar */}
          <select value={orden} onChange={e=>setOrden(e.target.value)}
            style={{padding:"7px 12px",border:"1px solid #e2e8f0",borderRadius:8,fontSize:12,color:"#64748b",background:"#fff",cursor:"pointer",outline:"none"}}>
            <option value="fecha">Ordenar: Más reciente</option>
            <option value="cobertura">Ordenar: Mayor cobertura</option>
            <option value="duracion">Ordenar: Mayor duración</option>
            <option value="pdvs">Ordenar: Más PDVs</option>
          </select>

          {/* Exportar */}
          <button onClick={descargarCSV}
            style={{display:"flex",alignItems:"center",gap:6,background:"#1e293b",color:"#fff",border:"none",borderRadius:8,padding:"8px 14px",fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>
            ⬇ Exportar CSV
          </button>
        </div>

        {filtered.length !== HISTORIAL_DATA.length && (
          <div style={{marginTop:10,fontSize:12,color:"#64748b"}}>
            Mostrando {filtered.length} de {HISTORIAL_DATA.length} campañas
            <button onClick={()=>{setBusqueda("");setFiltroCategoria("todos");setFiltroPerf("todos");}} style={{marginLeft:10,color:"#6366f1",background:"none",border:"none",cursor:"pointer",fontSize:12,fontWeight:600}}>Limpiar filtros</button>
          </div>
        )}
      </div>

      {/* Tabla */}
      <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead>
            <tr style={{background:"#f8fafc",borderBottom:"1px solid #e2e8f0"}}>
              {["Campaña","Audiencia","Período","Duración","PDVs alcanzados","Cobertura final"].map((h,i)=>(
                <th key={h} style={{padding:"12px 16px",textAlign:i>=3?"center":"left",fontSize:11,color:"#94a3b8",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",whiteSpace:"nowrap"}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(item=>{
              const c = colorCobertura(item.cobertura);
              const bg = bgCobertura(item.cobertura);
              const tipoC = COLORES_TIPO[item.tipo]||{bg:"#f1f5f9",border:"#94a3b8",text:"#475569"};
              return (
                <tr key={item.id} style={{borderBottom:"1px solid #f1f5f9",transition:"background 0.15s"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#f8fafc"}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <td style={{padding:"14px 16px"}}>
                    <div style={{fontWeight:600,fontSize:14,color:"#1e293b"}}>{item.nombre}</div>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginTop:4}}>
                      <span style={{fontSize:11,color:"#94a3b8"}}>{item.id}</span>
                      <span style={{display:"inline-block",padding:"1px 7px",borderRadius:99,background:tipoC.bg,color:tipoC.text,fontSize:10,fontWeight:700,border:`1px solid ${tipoC.border}22`}}>{item.tipo}</span>
                    </div>
                  </td>
                  <td style={{padding:"14px 16px",fontSize:13,color:"#475569"}}>{item.audiencia}</td>
                  <td style={{padding:"14px 16px",fontSize:12,color:"#64748b",whiteSpace:"nowrap"}}>
                    <div>{item.inicio}</div>
                    <div style={{color:"#94a3b8"}}>→ {item.fin}</div>
                  </td>
                  <td style={{padding:"14px 16px",textAlign:"center"}}>
                    <span style={{fontSize:13,fontWeight:600,color:"#1e293b"}}>{item.duracion}d</span>
                  </td>
                  <td style={{padding:"14px 16px",textAlign:"center"}}>
                    <div style={{fontSize:13,fontWeight:600,color:"#1e293b"}}>{item.pdvsAlcanzados.toLocaleString("es-AR")}</div>
                    <div style={{fontSize:11,color:"#94a3b8"}}>de {item.pdvsSegmento.toLocaleString("es-AR")}</div>
                  </td>
                  <td style={{padding:"14px 16px",textAlign:"center"}}>
                    <div style={{display:"inline-flex",flexDirection:"column",alignItems:"center",gap:4}}>
                      <span style={{padding:"4px 12px",borderRadius:99,background:bg,color:c,fontSize:13,fontWeight:800,border:`1px solid ${c}33`}}>{item.cobertura}%</span>
                      <span style={{fontSize:10,color:c,fontWeight:600}}>{labelPerf(item.cobertura)}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length===0 && <div style={{padding:48,textAlign:"center",color:"#94a3b8",fontSize:14}}>No hay campañas con ese filtro.</div>}
      </div>
    </div>
  );
}

// ─── MOBILE STYLES ───────────────────────────────────────────────────────────
const mobileStyles = `
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  body { margin: 0; padding: 0; overscroll-behavior: none; }
  @media (max-width: 768px) {
    .pvu-header-top    { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; padding: 12px 0 0 !important; }
    .pvu-header-actions{ flex-wrap: wrap !important; gap: 6px !important; }
    .pvu-header-wrap   { padding: 0 16px !important; }
    .pvu-tabs          { overflow-x: auto !important; -webkit-overflow-scrolling: touch !important; padding-bottom: 2px !important; scrollbar-width: none !important; }
    .pvu-tabs::-webkit-scrollbar { display: none !important; }
    .pvu-content       { padding: 16px !important; }
    .pvu-filtros       { overflow-x: auto !important; -webkit-overflow-scrolling: touch !important; flex-wrap: nowrap !important; scrollbar-width: none !important; }
    .pvu-filtros::-webkit-scrollbar { display: none !important; }
    .pvu-kpis          { flex-direction: column !important; }
    .pvu-search-row    { flex-direction: column !important; }
    .pvu-tipo-filtros  { overflow-x: auto !important; flex-wrap: nowrap !important; }
    .pvu-table-wrap    { overflow-x: auto !important; }
    .pvu-table         { min-width: 600px !important; }
    .pvu-alert-badge   { display: none !important; }
    .pvu-timestamp     { display: none !important; }
    .notif-panel       { width: calc(100vw - 32px) !important; right: -60px !important; }
    .pvu-logo-subtitle { display: none !important; }
    .cal-sidebar       { display: none !important; }
  }
  @media (min-width: 769px) {
    .mobile-bottom-nav { display: none !important; }
  }
`;

// ─── PANEL ALERTAS MOBILE ────────────────────────────────────────────────────
function PanelAlertasMobile({ alertas, onMarcarLeida, onMarcarTodas, userMail }) {
  const noLeidas = alertas.filter(a=>!a.leida).length;
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:8}}>
        <div>
          <div style={{fontWeight:700,fontSize:16,color:"#1e293b"}}>Notificaciones</div>
          <div style={{fontSize:12,color:"#94a3b8",marginTop:2}}>Enviadas a {userMail}</div>
        </div>
        {noLeidas>0 && <button onClick={onMarcarTodas} style={{fontSize:13,color:"#6366f1",background:"#ede9fe",border:"none",borderRadius:8,padding:"6px 12px",cursor:"pointer",fontWeight:600}}>Marcar todas leídas</button>}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {alertas.map(a=>{
          const pc=prioConfig[a.prioridad];
          return (
            <div key={a.id} style={{background:a.leida?"#fff":"#fafbff",border:`1px solid ${a.leida?"#e2e8f0":pc.color+"44"}`,borderRadius:12,padding:"14px 16px",display:"flex",gap:12}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:a.leida?"#e2e8f0":pc.color,marginTop:5,flexShrink:0}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:a.leida?500:700,color:"#1e293b",lineHeight:1.3}}>{a.titulo}</div>
                <div style={{fontSize:13,color:"#64748b",marginTop:4,lineHeight:1.4}}>{a.descripcion}</div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginTop:8,flexWrap:"wrap"}}>
                  <span style={{fontSize:11,color:"#94a3b8"}}>{a.hora}</span>
                  <span style={{padding:"2px 8px",borderRadius:99,background:pc.bg,color:pc.color,fontSize:11,fontWeight:700}}>{pc.label}</span>
                  {!a.leida && <button onClick={()=>onMarcarLeida(a.id)} style={{fontSize:12,color:"#6366f1",background:"none",border:"none",cursor:"pointer",fontWeight:600,padding:0}}>✓ Leída</button>}
                </div>
              </div>
            </div>
          );
        })}
        {alertas.length===0 && <div style={{textAlign:"center",padding:48,color:"#94a3b8"}}>Sin notificaciones pendientes 🎉</div>}
      </div>
    </div>
  );
}

// ─── PVU PRINCIPAL ───────────────────────────────────────────────────────────
function PVU({ user, onLogout }) {
  const [tab, setTab]       = useState("promos");
  const [filtro, setFiltro] = useState("todos");
  const [alertas, setAlertas] = useState(() => generarAlertas());
  const lastRefresh = "22 jun 2026, 14:37";
  const totalAlertas = [...PROMOS,...BANNERS].filter(d=>d.estado==="alerta").length;
  const noLeidas = alertas.filter(a=>!a.leida).length;

  const marcarLeida = id => setAlertas(prev=>prev.map(a=>a.id===id?{...a,leida:true}:a));
  const marcarTodas = ()  => setAlertas(prev=>prev.map(a=>({...a,leida:true})));

  useEffect(() => {
    if (!document.getElementById("pvu-styles")) {
      const style = document.createElement("style");
      style.id = "pvu-styles";
      style.textContent = mobileStyles;
      document.head.appendChild(style);
    }
    if (!document.querySelector('meta[name="viewport"]')) {
      const meta = document.createElement("meta");
      meta.name = "viewport";
      meta.content = "width=device-width, initial-scale=1, maximum-scale=1";
      document.head.appendChild(meta);
    }
  }, []);

  const tabs = [
    { id:"promos",     label:"Promos",     icon:"🏷",  count:PROMOS.length  },
    { id:"banners",    label:"Espacios",   icon:"📢",  count:BANNERS.length },
    { id:"calendario", label:"Calendario", icon:"📅",  count:null },
    { id:"historial",  label:"Historial",  icon:"📊",  count:null },
  ];
  const filtros = [{id:"todos",label:"Todos"},{id:"activo",label:"Activos"},{id:"alerta",label:"Alertas"},{id:"inactivo",label:"Programados"}];

  return (
    <div style={{minHeight:"100vh",background:"#f1f5f9",fontFamily:"'Inter',system-ui,sans-serif",paddingBottom:64}}>

      {/* HEADER */}
      <div style={{background:"#fff",borderBottom:"1px solid #e2e8f0",padding:"0 32px",position:"sticky",top:0,zIndex:50}}>
        <div className="pvu-header-wrap" style={{maxWidth:1200,margin:"0 auto"}}>
          <div className="pvu-header-top" style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"20px 0 0"}}>

            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:38,height:38,borderRadius:10,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>◎</div>
              <div>
                <div style={{fontSize:18,fontWeight:800,color:"#1e293b",letterSpacing:"-0.02em"}}>Panel de Verdad Única</div>
                <div className="pvu-logo-subtitle" style={{fontSize:12,color:"#94a3b8"}}>Estado en tiempo real</div>
              </div>
            </div>

            <div className="pvu-header-actions" style={{display:"flex",alignItems:"center",gap:10}}>
              {totalAlertas>0 && <div className="pvu-alert-badge" style={{display:"flex",alignItems:"center",gap:6,background:"#fffbeb",border:"1px solid #fde68a",borderRadius:8,padding:"7px 14px",fontSize:13,color:"#92400e",fontWeight:600}}>⚠ {totalAlertas} alerta{totalAlertas>1?"s":""}</div>}
              <div className="pvu-timestamp" style={{fontSize:12,color:"#94a3b8",background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:8,padding:"7px 12px"}}>🕐 {lastRefresh}</div>
              <CampanaNotificaciones alertas={alertas} onMarcarLeida={marcarLeida} onMarcarTodas={marcarTodas} userMail={user.mail}/>
              <div style={{display:"flex",alignItems:"center",gap:8,background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:8,padding:"6px 12px"}}>
                <span style={{fontSize:12,color:"#1e293b",fontWeight:600}}>👤 {user.nombre}</span>
                <span style={{color:"#e2e8f0"}}>|</span>
                <button onClick={onLogout} style={{fontSize:12,color:"#94a3b8",background:"none",border:"none",cursor:"pointer",fontWeight:500,padding:0}}>Salir</button>
              </div>
            </div>
          </div>

          {/* Tabs desktop */}
          <div className="pvu-tabs" style={{display:"flex",gap:4,marginTop:20}}>
            {tabs.map(t=>(
              <button key={t.id} onClick={()=>{setTab(t.id);setFiltro("todos");}}
                style={{padding:"10px 20px",border:"none",background:"transparent",cursor:"pointer",fontSize:14,fontWeight:tab===t.id?700:500,color:tab===t.id?"#6366f1":"#64748b",borderBottom:tab===t.id?"2px solid #6366f1":"2px solid transparent",transition:"all 0.15s",display:"flex",alignItems:"center",gap:8,whiteSpace:"nowrap"}}>
                {t.icon} {t.label}
                {t.count!==null && <span style={{background:tab===t.id?"#ede9fe":"#f1f5f9",color:tab===t.id?"#6366f1":"#94a3b8",borderRadius:99,padding:"1px 8px",fontSize:11,fontWeight:700}}>{t.count}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="pvu-content" style={{maxWidth:1200,margin:"0 auto",padding:"28px 32px"}}>
        {tab!=="calendario" && tab!=="alertas" && (
          <div className="pvu-filtros" style={{display:"flex",gap:8,marginBottom:20}}>
            {filtros.map(f=>(
              <button key={f.id} onClick={()=>setFiltro(f.id)}
                style={{padding:"6px 14px",border:`1px solid ${filtro===f.id?"#6366f1":"#e2e8f0"}`,borderRadius:8,background:filtro===f.id?"#ede9fe":"#fff",color:filtro===f.id?"#6366f1":"#64748b",fontSize:13,fontWeight:filtro===f.id?600:400,cursor:"pointer",whiteSpace:"nowrap"}}>
                {f.label}
              </button>
            ))}
          </div>
        )}
        {tab==="promos"     && <TabContent data={PROMOS}  tipo="promo"  filtro={filtro}/>}
        {tab==="banners"    && <TabContent data={BANNERS} tipo="banner" filtro={filtro}/>}
        {tab==="calendario" && <CalendarioActivaciones/>}
        {tab==="historial"  && <HistorialCampañas/>}
      </div>

      {/* NAV INFERIOR MOBILE */}
      <div className="mobile-bottom-nav" style={{position:"fixed",bottom:0,left:0,right:0,background:"#fff",borderTop:"1px solid #e2e8f0",display:"flex",zIndex:100}}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>{setTab(t.id);setFiltro("todos");}}
            style={{flex:1,padding:"10px 4px 12px",border:"none",background:"transparent",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,position:"relative"}}>
            <span style={{fontSize:22}}>{t.icon}</span>
            <span style={{fontSize:10,fontWeight:tab===t.id?700:400,color:tab===t.id?"#6366f1":"#94a3b8"}}>{t.label}</span>
            {t.count && <span style={{position:"absolute",top:6,right:"calc(50% - 18px)",background:"#dc2626",color:"#fff",borderRadius:99,fontSize:9,fontWeight:800,minWidth:14,height:14,display:"flex",alignItems:"center",justifyContent:"center",padding:"0 3px"}}>{t.count}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── APP ROOT ────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  if (!user) return <Login onLogin={setUser}/>;
  return <PVU user={user} onLogout={()=>setUser(null)}/>;
}
