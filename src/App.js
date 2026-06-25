import { useState, useEffect, useRef } from "react";
import React from "react";

// Roboto font
const _rf = document.createElement("link");
_rf.rel = "stylesheet";
_rf.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700;800&display=swap";
document.head.appendChild(_rf);


// ─── USUARIOS ───────────────────────────────────────────────────────────────
const USUARIOS = [
  { usuario: "admin",        password: "pvu2026",  nombre: "Administrador",      mail: "gjromano@arcor.com",        rol: "admin" },
  { usuario: "operaciones",  password: "ops123",   nombre: "Equipo Operaciones",  mail: "operaciones@tokin.com.ar",  rol: "ops"   },
  { usuario: "comunicacion", password: "com123",   nombre: "Equipo Comunicación", mail: "comunicacion@tokin.com.ar", rol: "comms" },
  { usuario: "promociones",  password: "promo123", nombre: "Equipo Promociones",  mail: "promociones@tokin.com.ar",  rol: "promo" },
];

// ─── DATOS MOCK ──────────────────────────────────────────────────────────────
const PROMOS = [
  { id:"PROMO-001", nombre:"2x1 en Traviata Porteñitas",         tipo:"Más por Menos", subtipo:"2x1",           estado:"activo",   inicio:"2026-06-16", fin:"2026-06-22", audiencia:"Todos los canales (exc. corpo/eess/caden)", pdvsSegmento:8400, pdvsAlcanzados:8400, cobertura:100, ultimaVerificacion:"hace 3 min",  detalle:"2x1 en Traviata C.TOQ Porteñitas 12x3x96g — Harinas" },
  { id:"PROMO-002", nombre:"15% en Cofler Rellenas",             tipo:"Regular",       subtipo:"Descuento %",   estado:"activo",   inicio:"2026-06-01", fin:"2026-06-30", audiencia:"Todos los canales (exc. corpo/eess/caden)", pdvsSegmento:8400, pdvsAlcanzados:7980, cobertura:95,  ultimaVerificacion:"hace 5 min",  detalle:"15% OFF en Cofler Rellenas Chococreamy, Chocolate y Bon o Bon 27x85g — Harinas" },
  { id:"PROMO-003", nombre:"15% en Cofler Bañadas",              tipo:"Regular",       subtipo:"Descuento %",   estado:"activo",   inicio:"2026-06-01", fin:"2026-06-30", audiencia:"Todos los canales (exc. corpo/eess/caden)", pdvsSegmento:8400, pdvsAlcanzados:8400, cobertura:100, ultimaVerificacion:"hace 2 min",  detalle:"15% OFF en Cofler Bañadas 16x132.8g y Cookies BOB — Harinas" },
  { id:"PROMO-004", nombre:"20% en Saladix Papa",                tipo:"Regular",       subtipo:"Descuento %",   estado:"activo",   inicio:"2026-06-16", fin:"2026-06-30", audiencia:"Todos los canales (exc. corpo/eess/caden)", pdvsSegmento:8400, pdvsAlcanzados:6720, cobertura:80,  ultimaVerificacion:"hace 11 min", detalle:"20% OFF en Papa Fritas Original 30x80g, 18x130g, Crema & Cebolla y Cheddar — Harinas" },
  { id:"PROMO-005", nombre:"2x1 en Mogul Masti",                 tipo:"Más por Menos", subtipo:"2x1",           estado:"activo",   inicio:"2026-06-01", fin:"2026-06-30", audiencia:"Todos los canales (exc. corpo/eess/caden)", pdvsSegmento:8400, pdvsAlcanzados:8400, cobertura:100, ultimaVerificacion:"hace 1 min",  detalle:"2x1 en toda la línea Mogul Masti — Golosinas" },
  { id:"PROMO-006", nombre:"20% en Frambuesas Bañadas",          tipo:"Regular",       subtipo:"Descuento %",   estado:"alerta",   inicio:"2026-06-01", fin:"2026-06-30", audiencia:"BAS y BAN / Resto distribuidores",          pdvsSegmento:3200, pdvsAlcanzados:1920, cobertura:60,  ultimaVerificacion:"hace 18 min", detalle:"20% en 1 BU de Frambuesas Bañadas Chocolate Leche y Chocolate Amargo 12x150g — Helados" },
  { id:"PROMO-007", nombre:"10% en Barritas Águila",             tipo:"Regular",       subtipo:"Descuento %",   estado:"activo",   inicio:"2026-06-16", fin:"2026-06-18", audiencia:"Todos los canales (exc. corpo/eess/caden)", pdvsSegmento:8400, pdvsAlcanzados:8400, cobertura:100, ultimaVerificacion:"hace 4 min",  detalle:"10% en Barritas Águila, DDL y Pistacho + Agrup. Chocotorta — Helados" },
  { id:"PROMO-008", nombre:"Día del Padre — 10% Barritas Águila",tipo:"Regular",       subtipo:"Descuento %",   estado:"inactivo", inicio:"2026-06-19", fin:"2026-06-25", audiencia:"Todos los canales (exc. corpo/eess/caden)", pdvsSegmento:8400, pdvsAlcanzados:0,    cobertura:0,   ultimaVerificacion:"—",           detalle:"Promoción especial Día del Padre — 10% en Barritas Águila — Helados" },
  { id:"PROMO-009", nombre:"10% en Postre Helado",               tipo:"Regular",       subtipo:"Descuento %",   estado:"alerta",   inicio:"2026-06-16", fin:"2026-06-18", audiencia:"BAS y BAN / Resto distribuidores",          pdvsSegmento:3200, pdvsAlcanzados:2240, cobertura:70,  ultimaVerificacion:"hace 9 min",  detalle:"10% en Postre Tofi, Águila, Bon o Bon, Cofler Block, Chocotorta y Almendrado — Helados" },
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
const tipoConfig  = { "Regular":{"color":"#1E6FD9","bg":"#E8F0FE"}, "Más por Menos":{"color":"#0ea5e9","bg":"#e0f2fe"}, "Progresiva":{"color":"#1557B0","bg":"#F0F4FF"} };
const estadoConfig= { activo:{"label":"Activo","color":"#16a34a","bg":"#f0fdf4","dot":"#16a34a"}, alerta:{"label":"Activo · Alerta cobertura","color":"#f97316","bg":"#fff7ed","dot":"#f97316"}, inactivo:{"label":"Programado","color":"#64748b","bg":"#f8fafc","dot":"#64748b"} };
const prioConfig  = { critica:{"color":"#dc2626","bg":"#fef2f2","label":"Crítica"}, alta:{"color":"#d97706","bg":"#fffbeb","label":"Alta"}, media:{"color":"#1E6FD9","bg":"#E8F0FE","label":"Media"}, info:{"color":"#16a34a","bg":"#f0fdf4","label":"Info"} };

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
function colorPorCobertura(value, estado) {
  if (estado === "inactivo") return "#cbd5e1";
  if (value >= 90) return "#16a34a";
  if (value >= 60) return "#f97316";
  return "#dc2626";
}

function CoverageBar({ value, estado }) {
  const color = colorPorCobertura(value, estado);
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
              <button onClick={onMarcarTodas} style={{fontSize:12,color:"#1E6FD9",background:"none",border:"none",cursor:"pointer",fontWeight:600}}>
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
                        style={{fontSize:11,color:"#1E6FD9",background:"none",border:"none",cursor:"pointer",fontWeight:600,padding:0}}>
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
            {tipo==="promo" ? <><TipoBadge tipo={item.tipo}/><span style={{color:"#cbd5e1"}}>·</span><span>{item.subtipo}</span></> : <span style={{fontWeight:500,color:"#1E6FD9"}}>{item.espacio}</span>}
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
        <KPICard label="Activos ahora"    value={activos}   accent="#1E6FD9"/>
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
            onFocus={e=>e.target.style.borderColor="#1E6FD9"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {tiposActuales.map(t=>(
            <button key={t} onClick={()=>setTipoFiltro(t)}
              style={{padding:"7px 13px",border:`1px solid ${tipoFiltro===t?"#1E6FD9":"#e2e8f0"}`,borderRadius:8,background:tipoFiltro===t?"#E8F0FE":"#fff",color:tipoFiltro===t?"#1E6FD9":"#64748b",fontSize:13,fontWeight:tipoFiltro===t?600:400,cursor:"pointer",whiteSpace:"nowrap"}}>
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
          <button onClick={()=>{setBusqueda("");setTipoFiltro("todos");}} style={{marginLeft:10,color:"#1E6FD9",background:"none",border:"none",cursor:"pointer",fontSize:13,fontWeight:600}}>Limpiar filtros</button>
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
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#E8F0FE 0%,#e0f2fe 100%)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Roboto',system-ui,sans-serif"}}>
      <div style={{background:"#fff",borderRadius:20,padding:"48px 44px",width:"100%",maxWidth:400,boxShadow:"0 8px 40px rgba(99,102,241,0.10)"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:32}}>
          <div style={{display:"flex",alignItems:"center",gap:4}}><span style={{fontSize:26,fontWeight:800,color:"#1E6FD9",letterSpacing:"-0.03em",fontFamily:"Roboto,sans-serif"}}>Tokin</span><span style={{width:8,height:8,borderRadius:"50%",background:"#1E6FD9",display:"inline-block",marginBottom:12}}></span></div>
          <div>
            <div style={{fontSize:17,fontWeight:800,color:"#1e293b",letterSpacing:"-0.02em"}}>Panel de Verdad Única</div>
            <div style={{fontSize:12,color:"#94a3b8"}}>Acceso interno</div>
          </div>
        </div>
        <div style={{marginBottom:16}}>
          <label style={{fontSize:13,fontWeight:600,color:"#374151",display:"block",marginBottom:6}}>Usuario</label>
          <input type="text" value={usuario} onChange={e=>{setUsuario(e.target.value);setError("");}} onKeyDown={e=>e.key==="Enter"&&handleSubmit()} placeholder="Tu usuario"
            style={{width:"100%",padding:"11px 14px",border:`1px solid ${error?"#fca5a5":"#e2e8f0"}`,borderRadius:10,fontSize:14,color:"#1e293b",outline:"none",boxSizing:"border-box"}}
            onFocus={e=>e.target.style.borderColor="#1E6FD9"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
        </div>
        <div style={{marginBottom:8}}>
          <label style={{fontSize:13,fontWeight:600,color:"#374151",display:"block",marginBottom:6}}>Contraseña</label>
          <div style={{position:"relative"}}>
            <input type={verPass?"text":"password"} value={password} onChange={e=>{setPassword(e.target.value);setError("");}} onKeyDown={e=>e.key==="Enter"&&handleSubmit()} placeholder="Tu contraseña"
              style={{width:"100%",padding:"11px 40px 11px 14px",border:`1px solid ${error?"#fca5a5":"#e2e8f0"}`,borderRadius:10,fontSize:14,color:"#1e293b",outline:"none",boxSizing:"border-box"}}
              onFocus={e=>e.target.style.borderColor="#1E6FD9"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
            <button onClick={()=>setVerPass(!verPass)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#94a3b8",fontSize:15}}>{verPass?"🙈":"👁"}</button>
          </div>
        </div>
        {error&&<div style={{fontSize:13,color:"#dc2626",fontWeight:500,marginBottom:12,padding:"8px 12px",background:"#fef2f2",borderRadius:8,border:"1px solid #fecaca"}}>{error}</div>}
        <button onClick={handleSubmit}
          style={{width:"100%",padding:"12px",background:"#1E6FD9",color:"#fff",border:"none",borderRadius:10,fontSize:15,fontWeight:700,cursor:"pointer",marginTop:8}}
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
              style={{padding:"7px 16px",border:`1px solid ${semana===i?"#1E6FD9":"#e2e8f0"}`,borderRadius:8,background:semana===i?"#E8F0FE":"#fff",color:semana===i?"#1E6FD9":"#64748b",fontSize:13,fontWeight:semana===i?700:400,cursor:"pointer"}}>
              {semanas[i].label}
            </button>
          ))}
        </div>
        <button onClick={simularMail}
          style={{display:"flex",alignItems:"center",gap:8,background:mailEnviado?"#16a34a":"linear-gradient(135deg,#1E6FD9,#1557B0)",color:"#fff",border:"none",borderRadius:10,padding:"9px 20px",fontSize:13,fontWeight:700,cursor:"pointer",transition:"all 0.3s"}}>
          {mailEnviado ? "✅ Resumen enviado" : "📧 Enviar resumen al equipo"}
        </button>
      </div>

      {/* Encabezado del resumen */}
      <div style={{background:"linear-gradient(135deg,#1E6FD9,#1557B0)",borderRadius:16,padding:"24px 28px",marginBottom:20,color:"#fff"}}>
        <div style={{fontSize:12,fontWeight:600,opacity:0.8,letterSpacing:"0.06em",textTransform:"uppercase"}}>Resumen semanal · PVU</div>
        <div style={{fontSize:22,fontWeight:800,marginTop:4,letterSpacing:"-0.02em"}}>{s.rango}</div>
        <div style={{fontSize:13,opacity:0.75,marginTop:4}}>Enviado automáticamente a {userMail}</div>
      </div>

      {/* KPIs */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:20}}>
        {[
          { label:"Ítems activos",       value:kpis.activos,                      accent:"#1E6FD9", sub:"en la plataforma" },
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
const NEGOCIOS = ["Alimentos","Chocolates","Golosinas","Helados","Harinas"];
const NEGOCIO_COLORES = {
  "Alimentos":   { bg:"#e0f2fe", border:"#0ea5e9", text:"#0369a1" },
  "Chocolates":  { bg:"#fce7f3", border:"#ec4899", text:"#9d174d" },
  "Golosinas":   { bg:"#fef9c3", border:"#eab308", text:"#854d0e" },
  "Helados":     { bg:"#ede9fe", border:"#8b5cf6", text:"#6d28d9" },
  "Harinas":     { bg:"#ffedd5", border:"#f97316", text:"#9a3412" },
};
const ESPACIO_COLORES = {
  "Landing Tematizada":{ bg:"#f0fdf4", border:"#16a34a", text:"#166534" },
  "Pop Up":            { bg:"#fce7f3", border:"#ec4899", text:"#9d174d" },
  "Banner Hero":       { bg:"#ffedd5", border:"#f97316", text:"#9a3412" },
  "Banner Search":     { bg:"#d1fae5", border:"#10b981", text:"#065f46" },
  "Banner Cart":       { bg:"#e0f2fe", border:"#38bdf8", text:"#075985" },
  "Banner Novedades":  { bg:"#f1f5f9", border:"#64748b", text:"#334155" },
  "Top Bar":           { bg:"#fdf2f8", border:"#d946ef", text:"#86198f" },
};

// Agregar negocio a las promos
const PROMOS_CAL = PROMOS.map((p,i) => ({
  ...p,
  negocio: NEGOCIOS[i % NEGOCIOS.length]
}));

const DIAS_SEMANA_FULL = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
const DIAS_SEMANA_SHORT = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
function fmtDate(d) {
  return d.toISOString().split("T")[0];
}
function fmtDiaMes(d) {
  return `${d.getDate()} ${["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"][d.getMonth()]}`;
}

function itemsEnFecha(fecha) {
  const todos = [
    ...PROMOS_CAL.map(p => ({ ...p, categoria:"promo" })),
    ...BANNERS.map(b => ({ ...b, categoria:"banner", negocio: b.espacio })),
  ];
  return todos.filter(i => i.inicio <= fecha && i.fin >= fecha);
}

function ChipItem({ item, onClick }) {
  const esPromo = item.categoria === "promo";
  const c = esPromo
    ? (NEGOCIO_COLORES[item.negocio] || { bg:"#f1f5f9", border:"#94a3b8", text:"#475569" })
    : (ESPACIO_COLORES[item.espacio] || { bg:"#f1f5f9", border:"#94a3b8", text:"#475569" });
  return (
    <div onClick={e => { e.stopPropagation(); onClick && onClick(item); }}
      style={{fontSize:10,fontWeight:600,color:c.text,background:c.bg,border:`1px solid ${c.border}`,borderRadius:4,padding:"2px 6px",marginBottom:2,cursor:"pointer",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",maxWidth:"100%"}}>
      {item.nombre}
    </div>
  );
}

function PanelDetalle({ item, onClose }) {
  if (!item) return (
    <div style={{width:260,background:"#f8fafc",border:"1px dashed #e2e8f0",borderRadius:14,padding:"24px 20px",flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",gap:8,minHeight:200}}>
      <div style={{fontSize:24}}>👆</div>
      <div style={{fontSize:13,color:"#94a3b8",lineHeight:1.5}}>Hacé click en cualquier ítem para ver el detalle</div>
    </div>
  );
  const esPromo = item.categoria === "promo";
  const c = esPromo
    ? (NEGOCIO_COLORES[item.negocio] || { bg:"#f1f5f9", border:"#94a3b8", text:"#475569" })
    : (ESPACIO_COLORES[item.espacio] || { bg:"#f1f5f9", border:"#94a3b8", text:"#475569" });
  return (
    <div style={{width:260,background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,padding:"18px",flexShrink:0}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
        <div style={{fontSize:13,fontWeight:700,color:"#1e293b",lineHeight:1.3,maxWidth:210}}>{item.nombre}</div>
        <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:"#94a3b8",fontSize:18,lineHeight:1,padding:0}}>×</button>
      </div>
      <span style={{display:"inline-block",padding:"3px 10px",borderRadius:99,background:c.bg,color:c.text,fontSize:11,fontWeight:700,border:`1px solid ${c.border}`,marginBottom:14}}>
        {esPromo ? item.negocio : item.espacio}
      </span>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {[
          ["Estado",     <span style={{color:estadoConfig[item.estado].color,fontWeight:700}}>{estadoConfig[item.estado].label}</span>],
          ["Vigencia",   `${item.inicio} → ${item.fin}`],
          ["Audiencia",  item.audiencia],
          ["PDVs",       `${item.pdvsAlcanzados.toLocaleString("es-AR")} / ${item.pdvsSegmento.toLocaleString("es-AR")}`],
          ["Cobertura",  `${item.cobertura}%`],
          esPromo ? ["Tipo", `${item.tipo} · ${item.subtipo}`] : ["Posición", item.espacio],
        ].map(([label,val]) => (
          <div key={label}>
            <div style={{fontSize:10,color:"#94a3b8",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em"}}>{label}</div>
            <div style={{fontSize:13,color:"#1e293b",marginTop:2}}>{val}</div>
          </div>
        ))}
      </div>
      <div style={{marginTop:14}}>
        <CoverageBar value={item.cobertura} estado={item.estado}/>
      </div>
    </div>
  );
}

function CalendarioActivaciones() {
  const HOY = new Date(2026, 5, 23);
  const [vista, setVista]           = useState("semanal");
  const [fechaRef, setFechaRef]     = useState(HOY);
  const [itemSeleccionado, setItem] = useState(null);
  const [filtroTipo, setFiltroTipo] = useState("todos");

  // ── NAVEGACIÓN ──────────────────────────────────────────────────────────
  const inicioSemana = (d) => {
    const day = new Date(d);
    day.setDate(day.getDate() - day.getDay());
    return day;
  };

  const anterior = () => {
    if (vista === "semanal") setFechaRef(d => addDays(d, -7));
    else setFechaRef(d => addDays(d, -1));
  };
  const siguiente = () => {
    if (vista === "semanal") setFechaRef(d => addDays(d, 7));
    else setFechaRef(d => addDays(d, 1));
  };
  const irHoy = () => setFechaRef(HOY);

  // ── LABEL DEL PERÍODO ───────────────────────────────────────────────────
  const labelPeriodo = () => {
    if (vista === "semanal") {
      const ini = inicioSemana(fechaRef);
      const fin = addDays(ini, 6);
      return `${fmtDiaMes(ini)} – ${fmtDiaMes(fin)} ${fin.getFullYear()}`;
    }
    return `${DIAS_SEMANA_FULL[fechaRef.getDay()]}, ${fmtDiaMes(fechaRef)} ${fechaRef.getFullYear()}`;
  };

  // ── FILTRADO ────────────────────────────────────────────────────────────
  const filtrar = (items) => {
    if (filtroTipo === "promos")  return items.filter(i => i.categoria === "promo");
    if (filtroTipo === "banners") return items.filter(i => i.categoria === "banner");
    return items;
  };

  // ── VISTA SEMANAL ───────────────────────────────────────────────────────
  const diasSemana = Array.from({length:7}, (_,i) => addDays(inicioSemana(fechaRef), i));

  const VistaSemanal = () => (
    <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,overflow:"hidden"}}>
      {/* Header días */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",borderBottom:"1px solid #e2e8f0"}}>
        {diasSemana.map((dia,i) => {
          const esHoy = fmtDate(dia) === fmtDate(HOY);
          return (
            <div key={i} onClick={() => { setVista("diaria"); setFechaRef(dia); }}
              style={{padding:"10px 6px",textAlign:"center",cursor:"pointer",background:esHoy?"#E8F0FE":"transparent",borderRight:i<6?"1px solid #f1f5f9":"none"}}
              onMouseEnter={e => { if(!esHoy) e.currentTarget.style.background="#f8fafc"; }}
              onMouseLeave={e => { if(!esHoy) e.currentTarget.style.background="transparent"; }}>
              <div style={{fontSize:11,fontWeight:600,color:esHoy?"#1E6FD9":"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em"}}>{DIAS_SEMANA_SHORT[dia.getDay()]}</div>
              <div style={{fontSize:esHoy?18:16,fontWeight:esHoy?800:400,color:esHoy?"#1E6FD9":"#1e293b",marginTop:2,lineHeight:1}}>
                {esHoy
                  ? <span style={{background:"#1E6FD9",color:"#fff",borderRadius:"50%",width:28,height:28,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:14}}>{dia.getDate()}</span>
                  : dia.getDate()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Filas por negocio (promos) */}
      {(filtroTipo === "todos" || filtroTipo === "promos") && (
        <div style={{borderBottom:"1px solid #f1f5f9"}}>
          <div style={{padding:"8px 12px",fontSize:11,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.06em",background:"#f8fafc"}}>
            📦 Promociones por negocio
          </div>
          {NEGOCIOS.map(neg => {
            const c = NEGOCIO_COLORES[neg];
            const tieneAlgo = diasSemana.some(dia =>
              itemsEnFecha(fmtDate(dia)).some(i => i.categoria==="promo" && i.negocio===neg)
            );
            if (!tieneAlgo) return null;
            return (
              <div key={neg} style={{display:"grid",gridTemplateColumns:"80px repeat(7,1fr)",borderBottom:"1px solid #f8fafc",minHeight:36}}>
                <div style={{padding:"6px 8px",display:"flex",alignItems:"center",borderRight:"1px solid #f1f5f9"}}>
                  <span style={{fontSize:10,fontWeight:700,color:c.text,background:c.bg,padding:"2px 6px",borderRadius:4,border:`1px solid ${c.border}`}}>{neg}</span>
                </div>
                {diasSemana.map((dia,i) => {
                  const items = itemsEnFecha(fmtDate(dia)).filter(it => it.categoria==="promo" && it.negocio===neg);
                  return (
                    <div key={i} style={{padding:"4px",borderRight:i<6?"1px solid #f8fafc":"none",minHeight:36}}>
                      {items.map(it => <ChipItem key={it.id} item={it} onClick={setItem}/>)}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}

      {/* Filas por tipo de espacio (banners) */}
      {(filtroTipo === "todos" || filtroTipo === "banners") && (
        <div>
          <div style={{padding:"8px 12px",fontSize:11,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.06em",background:"#f8fafc"}}>
            📢 Espacios publicitarios
          </div>
          {Object.keys(ESPACIO_COLORES).map(espacio => {
            const c = ESPACIO_COLORES[espacio];
            const tieneAlgo = diasSemana.some(dia =>
              itemsEnFecha(fmtDate(dia)).some(i => i.categoria==="banner" && i.espacio===espacio)
            );
            if (!tieneAlgo) return null;
            return (
              <div key={espacio} style={{display:"grid",gridTemplateColumns:"80px repeat(7,1fr)",borderBottom:"1px solid #f8fafc",minHeight:36}}>
                <div style={{padding:"6px 8px",display:"flex",alignItems:"center",borderRight:"1px solid #f1f5f9"}}>
                  <span style={{fontSize:10,fontWeight:700,color:c.text,background:c.bg,padding:"2px 6px",borderRadius:4,border:`1px solid ${c.border}`,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:72,display:"block"}}>{espacio}</span>
                </div>
                {diasSemana.map((dia,i) => {
                  const items = itemsEnFecha(fmtDate(dia)).filter(it => it.categoria==="banner" && it.espacio===espacio);
                  return (
                    <div key={i} style={{padding:"4px",borderRight:i<6?"1px solid #f8fafc":"none",minHeight:36}}>
                      {items.map(it => <ChipItem key={it.id} item={it} onClick={setItem}/>)}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  // ── VISTA DIARIA ─────────────────────────────────────────────────────────
  const VistaDiaria = () => {
    const fecha = fmtDate(fechaRef);
    const items = filtrar(itemsEnFecha(fecha));
    const promos  = items.filter(i => i.categoria === "promo");
    const banners = items.filter(i => i.categoria === "banner");

    if (items.length === 0) return (
      <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,padding:48,textAlign:"center",color:"#94a3b8",fontSize:14}}>
        No hay ítems activos para este día.
      </div>
    );

    return (
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        {/* Promos por negocio */}
        {promos.length > 0 && (filtroTipo === "todos" || filtroTipo === "promos") && (
          <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,overflow:"hidden"}}>
            <div style={{padding:"12px 18px",borderBottom:"1px solid #f1f5f9",fontWeight:700,fontSize:14,color:"#1e293b",display:"flex",alignItems:"center",gap:8}}>
              📦 Promociones <span style={{fontSize:12,color:"#94a3b8",fontWeight:400}}>— {promos.length} activas</span>
            </div>
            {NEGOCIOS.map(neg => {
              const grupo = promos.filter(i => i.negocio === neg);
              if (!grupo.length) return null;
              const c = NEGOCIO_COLORES[neg];
              return (
                <div key={neg} style={{borderBottom:"1px solid #f8fafc"}}>
                  <div style={{padding:"8px 18px",background:"#fafbfc",display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:11,fontWeight:700,color:c.text,background:c.bg,padding:"2px 8px",borderRadius:4,border:`1px solid ${c.border}`}}>{neg}</span>
                    <span style={{fontSize:11,color:"#94a3b8"}}>{grupo.length} promo{grupo.length>1?"s":""}</span>
                  </div>
                  {grupo.map(it => (
                    <div key={it.id} onClick={() => setItem(it)}
                      style={{padding:"10px 18px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",borderBottom:"1px solid #f8fafc"}}
                      onMouseEnter={e=>e.currentTarget.style.background="#f8fafc"}
                      onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13,fontWeight:600,color:"#1e293b"}}>{it.nombre}</div>
                        <div style={{fontSize:11,color:"#94a3b8",marginTop:2}}>{it.audiencia} · {it.subtipo}</div>
                      </div>
                      <div style={{fontSize:12,fontWeight:700,color:it.cobertura===100?"#16a34a":it.cobertura>=85?"#d97706":"#dc2626"}}>
                        {it.cobertura}%
                      </div>
                      <span style={{fontSize:11,color:"#94a3b8"}}>›</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* Banners por tipo */}
        {banners.length > 0 && (filtroTipo === "todos" || filtroTipo === "banners") && (
          <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,overflow:"hidden"}}>
            <div style={{padding:"12px 18px",borderBottom:"1px solid #f1f5f9",fontWeight:700,fontSize:14,color:"#1e293b",display:"flex",alignItems:"center",gap:8}}>
              📢 Espacios publicitarios <span style={{fontSize:12,color:"#94a3b8",fontWeight:400}}>— {banners.length} activos</span>
            </div>
            {banners.map(it => {
              const c = ESPACIO_COLORES[it.espacio] || {bg:"#f1f5f9",border:"#94a3b8",text:"#475569"};
              return (
                <div key={it.id} onClick={() => setItem(it)}
                  style={{padding:"12px 18px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",borderBottom:"1px solid #f8fafc"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#f8fafc"}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <span style={{fontSize:11,fontWeight:700,color:c.text,background:c.bg,padding:"2px 8px",borderRadius:4,border:`1px solid ${c.border}`,whiteSpace:"nowrap"}}>{it.espacio}</span>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:600,color:"#1e293b"}}>{it.nombre}</div>
                    <div style={{fontSize:11,color:"#94a3b8",marginTop:2}}>{it.audiencia}</div>
                  </div>
                  <div style={{fontSize:12,fontWeight:700,color:it.cobertura===100?"#16a34a":it.cobertura>=85?"#d97706":"#dc2626"}}>
                    {it.cobertura}%
                  </div>
                  <span style={{fontSize:11,color:"#94a3b8"}}>›</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {/* Controles */}
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16,flexWrap:"wrap"}}>
        {/* Selector de vista */}
        <div style={{display:"flex",border:"1px solid #e2e8f0",borderRadius:8,overflow:"hidden"}}>
          {[["semanal","Semana"],["diaria","Día"]].map(([id,label]) => (
            <button key={id} onClick={() => setVista(id)}
              style={{padding:"7px 16px",border:"none",background:vista===id?"#1E6FD9":"#fff",color:vista===id?"#fff":"#64748b",fontSize:13,fontWeight:vista===id?700:400,cursor:"pointer"}}>
              {label}
            </button>
          ))}
        </div>

        {/* Navegación */}
        <button onClick={anterior} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:8,padding:"7px 14px",cursor:"pointer",fontSize:15,color:"#64748b"}}>‹</button>
        <div style={{fontWeight:700,fontSize:14,color:"#1e293b",minWidth:200,textAlign:"center"}}>{labelPeriodo()}</div>
        <button onClick={siguiente} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:8,padding:"7px 14px",cursor:"pointer",fontSize:15,color:"#64748b"}}>›</button>
        <button onClick={irHoy} style={{background:"#E8F0FE",border:"1px solid #1E6FD9",borderRadius:8,padding:"7px 14px",cursor:"pointer",fontSize:12,fontWeight:600,color:"#1E6FD9"}}>Hoy</button>

        {/* Filtro tipo */}
        <div style={{marginLeft:"auto",display:"flex",gap:6}}>
          {[["todos","Todos"],["promos","Promos"],["banners","Espacios"]].map(([id,label]) => (
            <button key={id} onClick={() => setFiltroTipo(id)}
              style={{padding:"6px 12px",border:`1px solid ${filtroTipo===id?"#1E6FD9":"#e2e8f0"}`,borderRadius:8,background:filtroTipo===id?"#E8F0FE":"#fff",color:filtroTipo===id?"#1E6FD9":"#64748b",fontSize:12,fontWeight:filtroTipo===id?700:400,cursor:"pointer"}}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido + panel detalle */}
      <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
        <div style={{flex:1,minWidth:0}}>
          {vista === "semanal" ? <VistaSemanal/> : <VistaDiaria/>}
        </div>
        <PanelDetalle item={itemSeleccionado} onClose={() => setItem(null)}/>
      </div>
    </div>
  );
}

// ─── HISTORIAL DE CAMPAÑAS ───────────────────────────────────────────────────
const HISTORIAL_PROMOS = [
  { id:"PROMO-H001", nombre:"2x1 Traviata Porteñitas",      negocio:"Harinas",    tipo:"Más por Menos", subtipo:"2x1",         audiencia:"Todos los canales",          inicio:"2026-05-01", fin:"2026-05-31", pdvsSegmento:8400, pdvsAlcanzados:8316, cobertura:99, duracion:30, pedidos:1842, unidades:28640, bultos:952, kilos:2748 },
  { id:"PROMO-H002", nombre:"15% OFF Cofler Rellenas",      negocio:"Chocolates", tipo:"Regular",       subtipo:"Descuento %",  audiencia:"Todos los canales",          inicio:"2026-05-01", fin:"2026-05-31", pdvsSegmento:8400, pdvsAlcanzados:7980, cobertura:95, duracion:30, pedidos:2103, unidades:43200, bultos:1600, kilos:3715 },
  { id:"PROMO-H003", nombre:"Progresiva Galletitas",        negocio:"Alimentos",  tipo:"Progresiva",    subtipo:"10u→10%/20u→25%", audiencia:"Dietéticas GBA Norte",   inicio:"2026-05-15", fin:"2026-06-01", pdvsSegmento:520,  pdvsAlcanzados:468,  cobertura:90, duracion:17, pedidos:312,  unidades:8900,  bultos:420,  kilos:980  },
  { id:"PROMO-H004", nombre:"3x2 Jugos",                    negocio:"Alimentos",  tipo:"Más por Menos", subtipo:"3x2",          audiencia:"Estaciones de Servicio YPF", inicio:"2026-04-01", fin:"2026-04-30", pdvsSegmento:890,  pdvsAlcanzados:712,  cobertura:80, duracion:30, pedidos:540,  unidades:14200, bultos:710,  kilos:2130 },
  { id:"PROMO-H005", nombre:"15% OFF Chocolates Águila",    negocio:"Chocolates", tipo:"Regular",       subtipo:"Descuento %",  audiencia:"Kioscos Acuerdo XYZ",        inicio:"2026-04-10", fin:"2026-04-20", pdvsSegmento:2100, pdvsAlcanzados:2100, cobertura:100,duracion:10, pedidos:890,  unidades:19800, bultos:825,  kilos:1683 },
  { id:"PROMO-H006", nombre:"4x3 Agua Mineral",             negocio:"Alimentos",  tipo:"Más por Menos", subtipo:"4x3",          audiencia:"Establecimientos Educativos",inicio:"2026-03-01", fin:"2026-03-31", pdvsSegmento:670,  pdvsAlcanzados:536,  cobertura:80, duracion:31, pedidos:421,  unidades:11200, bultos:620,  kilos:5600 },
  { id:"PROMO-H007", nombre:"2x1 Mogul Masti Mayo",         negocio:"Golosinas",  tipo:"Más por Menos", subtipo:"2x1",          audiencia:"Todos los canales",          inicio:"2026-05-01", fin:"2026-05-31", pdvsSegmento:8400, pdvsAlcanzados:8400, cobertura:100,duracion:30, pedidos:3210, unidades:67000, bultos:2790, kilos:4020 },
  { id:"PROMO-H008", nombre:"20% OFF Saladix Abril",        negocio:"Alimentos",  tipo:"Regular",       subtipo:"Descuento %",  audiencia:"Todos los canales",          inicio:"2026-04-01", fin:"2026-04-30", pdvsSegmento:8400, pdvsAlcanzados:6720, cobertura:80, duracion:30, pedidos:1580, unidades:38400, bultos:1600, kilos:3072 },
];

const HISTORIAL_BANNERS = [
  { id:"BAN-H001", nombre:"Landing Día de la Madre",        espacio:"Landing Tematizada", audiencia:"Todos los PDVs",           inicio:"2026-05-20", fin:"2026-05-26", pdvsSegmento:12400, pdvsAlcanzados:12400, cobertura:100, duracion:6  },
  { id:"BAN-H002", nombre:"Hero — Campaña Otoño",           espacio:"Banner Hero",        audiencia:"Almacenes Cat. A y B1",    inicio:"2026-04-01", fin:"2026-05-31", pdvsSegmento:3800,  pdvsAlcanzados:3496,  cobertura:92,  duracion:61 },
  { id:"BAN-H003", nombre:"Pop Up — Acuerdo Banco XYZ",     espacio:"Pop Up",             audiencia:"Kioscos Acuerdo XYZ",      inicio:"2026-03-15", fin:"2026-04-15", pdvsSegmento:2100,  pdvsAlcanzados:1680,  cobertura:80,  duracion:31 },
  { id:"BAN-H004", nombre:"Top Bar — Semana Santa",         espacio:"Top Bar",            audiencia:"Todos los PDVs",           inicio:"2026-03-28", fin:"2026-04-02", pdvsSegmento:12400, pdvsAlcanzados:12400, cobertura:100, duracion:5  },
  { id:"BAN-H005", nombre:"Banner Search — Yerba Mate",     espacio:"Banner Search",      audiencia:"Almacenes Cat. A y B1",    inicio:"2026-05-10", fin:"2026-05-20", pdvsSegmento:3800,  pdvsAlcanzados:2888,  cobertura:76,  duracion:10 },
  { id:"BAN-H006", nombre:"Banner Cart — Chocolates",       espacio:"Banner Cart",        audiencia:"Kioscos Acuerdo XYZ",      inicio:"2026-04-10", fin:"2026-04-20", pdvsSegmento:2100,  pdvsAlcanzados:2100,  cobertura:100, duracion:10 },
];

function HistorialCampañas() {
  const [subTab, setSubTab]       = useState("promos");
  const [busqueda, setBusqueda]   = useState("");

  const colorCob = v => v>=90?"#16a34a":v>=60?"#f97316":"#dc2626";
  const bgCob    = v => v>=90?"#f0fdf4":v>=60?"#fff7ed":"#fef2f2";

  const NEGOCIO_C = { "Alimentos":{bg:"#e0f2fe",border:"#0ea5e9",text:"#0369a1"}, "Chocolates":{bg:"#fce7f3",border:"#ec4899",text:"#9d174d"}, "Golosinas":{bg:"#fef9c3",border:"#eab308",text:"#854d0e"}, "Helados":{bg:"#ede9fe",border:"#8b5cf6",text:"#6d28d9"}, "Harinas":{bg:"#ffedd5",border:"#f97316",text:"#9a3412"} };
  const ESPACIO_C = { "Landing Tematizada":{bg:"#f0fdf4",border:"#16a34a",text:"#166534"}, "Pop Up":{bg:"#fce7f3",border:"#ec4899",text:"#9d174d"}, "Banner Hero":{bg:"#ffedd5",border:"#f97316",text:"#9a3412"}, "Banner Search":{bg:"#d1fae5",border:"#10b981",text:"#065f46"}, "Banner Cart":{bg:"#e0f2fe",border:"#38bdf8",text:"#075985"}, "Banner Novedades":{bg:"#f1f5f9",border:"#64748b",text:"#334155"}, "Top Bar":{bg:"#fdf2f8",border:"#d946ef",text:"#86198f"} };

  const filtrarPromos  = HISTORIAL_PROMOS.filter(i => !busqueda || i.nombre.toLowerCase().includes(busqueda.toLowerCase()) || i.negocio.toLowerCase().includes(busqueda.toLowerCase()));
  const filtrarBanners = HISTORIAL_BANNERS.filter(i => !busqueda || i.nombre.toLowerCase().includes(busqueda.toLowerCase()) || i.espacio.toLowerCase().includes(busqueda.toLowerCase()));

  return (
    <div>
      {/* Sub-tabs */}
      <div style={{display:"flex",gap:4,marginBottom:20,borderBottom:"1px solid #e2e8f0",paddingBottom:0}}>
        {[["promos","🏷 Promociones finalizadas",HISTORIAL_PROMOS.length],["banners","📢 Espacios finalizados",HISTORIAL_BANNERS.length]].map(([id,label,count])=>(
          <button key={id} onClick={()=>{setSubTab(id);setBusqueda("");}}
            style={{padding:"10px 20px",border:"none",background:"transparent",cursor:"pointer",fontSize:14,fontWeight:subTab===id?700:500,color:subTab===id?"#1E6FD9":"#64748b",borderBottom:subTab===id?"2px solid #1E6FD9":"2px solid transparent",display:"flex",alignItems:"center",gap:8,whiteSpace:"nowrap"}}>
            {label}
            <span style={{background:subTab===id?"#E8F0FE":"#f1f5f9",color:subTab===id?"#1E6FD9":"#94a3b8",borderRadius:99,padding:"1px 8px",fontSize:11,fontWeight:700}}>{count}</span>
          </button>
        ))}
      </div>

      {/* Buscador */}
      <div style={{position:"relative",marginBottom:16,maxWidth:400}}>
        <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#94a3b8",fontSize:15,pointerEvents:"none"}}>🔍</span>
        <input type="text" placeholder="Buscar..." value={busqueda} onChange={e=>setBusqueda(e.target.value)}
          style={{width:"100%",padding:"9px 12px 9px 36px",border:"1px solid #e2e8f0",borderRadius:10,fontSize:13,outline:"none",boxSizing:"border-box"}}
          onFocus={e=>e.target.style.borderColor="#1E6FD9"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
      </div>

      {/* ── PROMOS ── */}
      {subTab==="promos" && (
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {filtrarPromos.map(item => {
            const nc = NEGOCIO_C[item.negocio]||{bg:"#f1f5f9",border:"#94a3b8",text:"#475569"};
            const cc = colorCob(item.cobertura);
            const bc = bgCob(item.cobertura);
            return (
              <div key={item.id} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,overflow:"hidden"}}>
                {/* Header card */}
                <div style={{padding:"14px 20px",borderBottom:"1px solid #f1f5f9",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:15,color:"#1e293b"}}>{item.nombre}</div>
                    <div style={{fontSize:11,color:"#94a3b8",marginTop:3,display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                      <span>{item.id}</span>
                      <span style={{background:nc.bg,color:nc.text,border:`1px solid ${nc.border}`,borderRadius:4,padding:"1px 7px",fontWeight:700,fontSize:10}}>{item.negocio}</span>
                      <span>{item.inicio} → {item.fin} · {item.duracion} días</span>
                    </div>
                  </div>
                  <span style={{padding:"4px 14px",borderRadius:99,background:bc,color:cc,fontSize:13,fontWeight:800,border:`1px solid ${cc}33`}}>{item.cobertura}%</span>
                </div>

                {/* Contenido: cobertura + venta */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0}}>
                  {/* Cobertura PDVs */}
                  <div style={{padding:"16px 20px",borderRight:"1px solid #f1f5f9"}}>
                    <div style={{fontSize:11,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:12}}>📍 Cobertura de PDVs</div>
                    <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
                      <div>
                        <div style={{fontSize:11,color:"#94a3b8",fontWeight:600}}>Audiencia</div>
                        <div style={{fontSize:16,fontWeight:800,color:"#1e293b",marginTop:2}}>{item.pdvsSegmento.toLocaleString("es-AR")}</div>
                        <div style={{fontSize:11,color:"#94a3b8"}}>PDVs segmento</div>
                      </div>
                      <div>
                        <div style={{fontSize:11,color:"#94a3b8",fontWeight:600}}>Impactados</div>
                        <div style={{fontSize:16,fontWeight:800,color:cc,marginTop:2}}>{item.pdvsAlcanzados.toLocaleString("es-AR")}</div>
                        <div style={{fontSize:11,color:"#94a3b8"}}>PDVs alcanzados</div>
                      </div>
                    </div>
                    <div style={{marginTop:12}}>
                      <div style={{height:6,background:"#e2e8f0",borderRadius:99,overflow:"hidden"}}>
                        <div style={{width:`${item.cobertura}%`,height:"100%",background:cc,borderRadius:99}}/>
                      </div>
                      <div style={{fontSize:11,color:"#94a3b8",marginTop:4}}>{item.audiencia}</div>
                    </div>
                  </div>

                  {/* Datos de venta */}
                  <div style={{padding:"16px 20px"}}>
                    <div style={{fontSize:11,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:12}}>📈 Datos de venta</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                      {[
                        ["Pedidos",  item.pedidos.toLocaleString("es-AR"),  "con esta promo",   "#1E6FD9"],
                        ["Unidades", item.unidades.toLocaleString("es-AR"), "vendidas",         "#16a34a"],
                        ["Bultos",   item.bultos.toLocaleString("es-AR"),   "vendidos",         "#d97706"],
                        ["Kilos",    item.kilos.toLocaleString("es-AR"),    "vendidos",         "#8b5cf6"],
                      ].map(([label,val,sub,color])=>(
                        <div key={label} style={{background:"#f8fafc",borderRadius:10,padding:"10px 12px",border:"1px solid #f1f5f9"}}>
                          <div style={{fontSize:11,color:"#94a3b8",fontWeight:600}}>{label}</div>
                          <div style={{fontSize:18,fontWeight:800,color,marginTop:2,lineHeight:1}}>{val}</div>
                          <div style={{fontSize:10,color:"#94a3b8",marginTop:3}}>{sub}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {filtrarPromos.length===0 && <div style={{padding:48,textAlign:"center",color:"#94a3b8"}}>No hay resultados.</div>}
        </div>
      )}

      {/* ── BANNERS ── */}
      {subTab==="banners" && (
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {filtrarBanners.map(item => {
            const ec = ESPACIO_C[item.espacio]||{bg:"#f1f5f9",border:"#94a3b8",text:"#475569"};
            const cc = colorCob(item.cobertura);
            const bc = bgCob(item.cobertura);
            return (
              <div key={item.id} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,overflow:"hidden"}}>
                {/* Header */}
                <div style={{padding:"14px 20px",borderBottom:"1px solid #f1f5f9",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:15,color:"#1e293b"}}>{item.nombre}</div>
                    <div style={{fontSize:11,color:"#94a3b8",marginTop:3,display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                      <span>{item.id}</span>
                      <span style={{background:ec.bg,color:ec.text,border:`1px solid ${ec.border}`,borderRadius:4,padding:"1px 7px",fontWeight:700,fontSize:10}}>{item.espacio}</span>
                      <span>{item.inicio} → {item.fin} · {item.duracion} días</span>
                    </div>
                  </div>
                  <span style={{padding:"4px 14px",borderRadius:99,background:bc,color:cc,fontSize:13,fontWeight:800,border:`1px solid ${cc}33`}}>{item.cobertura}%</span>
                </div>

                {/* Cobertura */}
                <div style={{padding:"16px 20px"}}>
                  <div style={{fontSize:11,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:12}}>📍 Cobertura de audiencia impactada</div>
                  <div style={{display:"flex",gap:24,alignItems:"center",flexWrap:"wrap"}}>
                    <div>
                      <div style={{fontSize:11,color:"#94a3b8",fontWeight:600}}>PDVs en audiencia</div>
                      <div style={{fontSize:20,fontWeight:800,color:"#1e293b",marginTop:2}}>{item.pdvsSegmento.toLocaleString("es-AR")}</div>
                    </div>
                    <div style={{fontSize:20,color:"#e2e8f0"}}>→</div>
                    <div>
                      <div style={{fontSize:11,color:"#94a3b8",fontWeight:600}}>PDVs impactados</div>
                      <div style={{fontSize:20,fontWeight:800,color:cc,marginTop:2}}>{item.pdvsAlcanzados.toLocaleString("es-AR")}</div>
                    </div>
                    <div style={{flex:1,minWidth:200}}>
                      <div style={{height:8,background:"#e2e8f0",borderRadius:99,overflow:"hidden"}}>
                        <div style={{width:`${item.cobertura}%`,height:"100%",background:cc,borderRadius:99}}/>
                      </div>
                      <div style={{fontSize:11,color:"#94a3b8",marginTop:4}}>{item.audiencia}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {filtrarBanners.length===0 && <div style={{padding:48,textAlign:"center",color:"#94a3b8"}}>No hay resultados.</div>}
        </div>
      )}
    </div>
  );
}

// ─── COBERTURA POR DISTRIBUIDOR ──────────────────────────────────────────────
const DISTRIBUIDORES_DATA = [
  { id:"tokin0023", nombre:"MENDEZ S.R.L.",                    pdvsTotal:380, pdvsFalla:280, zona:"GBA Norte"    },
  { id:"tokin0045", nombre:"RIM S.A.",                         pdvsTotal:210, pdvsFalla:190, zona:"GBA Sur"      },
  { id:"tokin0041", nombre:"LOGISTICA ZONA SUR S.A.",          pdvsTotal:320, pdvsFalla:120, zona:"GBA Sur"      },
  { id:"tokin0078", nombre:"TRES SOLES S.R.L.",                pdvsTotal:290, pdvsFalla:90,  zona:"Litoral"      },
  { id:"tokin0091", nombre:"DISTRIBUIDORA SINERGIA S.R.L.",    pdvsTotal:180, pdvsFalla:80,  zona:"NOA"          },
  { id:"tokin0012", nombre:"GONZALEZ GARCIA S.A.",             pdvsTotal:450, pdvsFalla:40,  zona:"CABA"         },
  { id:"tokin0060", nombre:"LATAM DISTRIBUCION S.A.",          pdvsTotal:260, pdvsFalla:20,  zona:"Centro"       },
  { id:"tokin0034", nombre:"JORGE FARJAT S.A.",                pdvsTotal:290, pdvsFalla:10,  zona:"Cuyo"         },
  { id:"tokin0067", nombre:"DIGOBAL S.R.L.",                   pdvsTotal:410, pdvsFalla:0,   zona:"Centro"       },
  { id:"tokin0144", nombre:"MENDOCOR S.R.L.",                  pdvsTotal:340, pdvsFalla:0,   zona:"Cuyo"         },
  { id:"tokin0103", nombre:"ROSETA S.R.L.",                    pdvsTotal:260, pdvsFalla:0,   zona:"Litoral"      },
  { id:"tokin0156", nombre:"ESEPA S.A.",                       pdvsTotal:150, pdvsFalla:0,   zona:"Patagonia"    },
];

function CoberturaPorDistribuidor() {
  const [itemFoco, setItemFoco] = useState(null);
  const [ordenar, setOrdenar]   = useState("fallas");

  const totalFallas = DISTRIBUIDORES_DATA.reduce((a,d) => a + d.pdvsFalla, 0);
  const totalPdvs   = DISTRIBUIDORES_DATA.reduce((a,d) => a + d.pdvsTotal, 0);
  const conFallas   = DISTRIBUIDORES_DATA.filter(d => d.pdvsFalla > 0).length;

  const sorted = [...DISTRIBUIDORES_DATA].sort((a,b) => {
    // Siempre críticos primero, luego por el criterio elegido
    const pctA = a.pdvsFalla / a.pdvsTotal;
    const pctB = b.pdvsFalla / b.pdvsTotal;
    if (ordenar === "fallas")     return b.pdvsFalla - a.pdvsFalla;
    if (ordenar === "cobertura")  return pctB - pctA;
    if (ordenar === "nombre")     return a.nombre.localeCompare(b.nombre);
    return b.pdvsFalla - a.pdvsFalla;
  });

  const colorFalla = (pct) =>
    pct === 0 ? "#16a34a" : pct < 30 ? "#d97706" : "#dc2626";
  const bgFalla = (pct) =>
    pct === 0 ? "#f0fdf4" : pct < 30 ? "#fffbeb" : "#fef2f2";
  const labelFalla = (pct) =>
    pct === 0 ? "OK" : pct < 30 ? "Atención" : "Crítico";

  return (
    <div>
      {/* KPIs resumen */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:20}}>
        {[
          { label:"PDVs con falla",      value:totalFallas.toLocaleString("es-AR"), accent:"#dc2626", sub:"en toda la red" },
          { label:"Distribuidores afectados", value:`${conFallas} de ${DISTRIBUIDORES_DATA.length}`, accent:"#d97706", sub:"con al menos 1 PDV fallido" },
          { label:"Cobertura red",        value:`${Math.round((1 - totalFallas/totalPdvs)*100)}%`, accent:"#1E6FD9", sub:"promedio general" },
        ].map(k => (
          <div key={k.label} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:"16px 18px"}}>
            <div style={{fontSize:11,color:"#94a3b8",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:6}}>{k.label}</div>
            <div style={{fontSize:26,fontWeight:800,color:k.accent,lineHeight:1}}>{k.value}</div>
            <div style={{fontSize:11,color:"#64748b",marginTop:4}}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Ordenar */}
      <div style={{display:"flex",gap:8,marginBottom:16,alignItems:"center"}}>
        <span style={{fontSize:12,color:"#94a3b8",fontWeight:600}}>Ordenar por:</span>
        {[["fallas","Mayor cantidad de fallas"],["cobertura","Peor cobertura"],["nombre","Nombre"]].map(([id,label]) => (
          <button key={id} onClick={() => setOrdenar(id)}
            style={{padding:"5px 12px",border:`1px solid ${ordenar===id?"#1E6FD9":"#e2e8f0"}`,borderRadius:8,background:ordenar===id?"#E8F0FE":"#fff",color:ordenar===id?"#1E6FD9":"#64748b",fontSize:12,fontWeight:ordenar===id?700:400,cursor:"pointer"}}>
            {label}
          </button>
        ))}
      </div>

      {/* Lista de distribuidores */}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {sorted.map(d => {
          const pctFalla = Math.round((d.pdvsFalla / d.pdvsTotal) * 100);
          const pctOk    = 100 - pctFalla;
          const color    = colorFalla(pctFalla);
          const bg       = bgFalla(pctFalla);
          const esFoco   = itemFoco === d.id;

          return (
            <div key={d.id}
              onClick={() => setItemFoco(esFoco ? null : d.id)}
              style={{background:"#fff",border:`1.5px solid ${esFoco ? "#1E6FD9" : "#e2e8f0"}`,borderRadius:12,padding:"14px 18px",cursor:"pointer",transition:"all 0.15s"}}
              onMouseEnter={e => { if (!esFoco) e.currentTarget.style.borderColor = "#c3d9f7"; }}
              onMouseLeave={e => { if (!esFoco) e.currentTarget.style.borderColor = "#e2e8f0"; }}>

              <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
                {/* Nombre y zona */}
                <div style={{flex:1,minWidth:160}}>
                  <div style={{fontWeight:700,fontSize:14,color:"#1e293b"}}>{d.nombre}</div>
                  <div style={{fontSize:11,color:"#94a3b8",marginTop:3,display:"flex",alignItems:"center",gap:6}}>
                    <span style={{background:"#E8F0FE",color:"#1E6FD9",borderRadius:4,padding:"1px 6px",fontWeight:700,fontSize:10}}>{d.id}</span>
                    <span>·</span>
                    <span>{d.zona}</span>
                  </div>
                </div>

                {/* Barra de cobertura */}
                <div style={{flex:2,minWidth:180}}>
                  <div style={{height:8,background:"#e2e8f0",borderRadius:99,overflow:"hidden",display:"flex"}}>
                    <div style={{width:`${pctOk}%`,height:"100%",background:"#1E6FD9",transition:"width 0.5s ease"}}/>
                    {pctFalla > 0 && <div style={{width:`${pctFalla}%`,height:"100%",background:color}}/>}
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                    <span style={{fontSize:10,color:"#64748b"}}>{d.pdvsTotal - d.pdvsFalla} OK</span>
                    {pctFalla > 0 && <span style={{fontSize:10,color,fontWeight:600}}>{d.pdvsFalla} con falla</span>}
                  </div>
                </div>

                {/* Badge estado */}
                <div style={{padding:"4px 12px",borderRadius:99,background:bg,color,fontSize:12,fontWeight:700,border:`1px solid ${color}33`,whiteSpace:"nowrap"}}>
                  {pctFalla === 0 ? "✓ Sin fallas" : `${pctFalla}% ${labelFalla(pctFalla)}`}
                </div>
              </div>

              {/* Detalle expandido */}
              {esFoco && d.pdvsFalla > 0 && (
                <div style={{marginTop:14,paddingTop:14,borderTop:"1px solid #f1f5f9",display:"flex",gap:24,flexWrap:"wrap",alignItems:"center"}}>
                  <div>
                    <div style={{fontSize:11,color:"#94a3b8",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em"}}>PDVs totales</div>
                    <div style={{fontSize:16,fontWeight:700,color:"#1e293b",marginTop:2}}>{d.pdvsTotal.toLocaleString("es-AR")}</div>
                  </div>
                  <div>
                    <div style={{fontSize:11,color:"#94a3b8",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em"}}>PDVs con falla</div>
                    <div style={{fontSize:16,fontWeight:700,color,marginTop:2}}>{d.pdvsFalla.toLocaleString("es-AR")}</div>
                  </div>
                  <div>
                    <div style={{fontSize:11,color:"#94a3b8",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em"}}>Zona</div>
                    <div style={{fontSize:16,fontWeight:700,color:"#1e293b",marginTop:2}}>{d.zona}</div>
                  </div>
                  <div style={{marginLeft:"auto"}}>
                    <div style={{fontSize:12,color:"#94a3b8",marginBottom:6}}>Acción recomendada:</div>
                    <div style={{fontSize:13,fontWeight:600,color:"#1e293b",background:"#F5F7FA",padding:"8px 14px",borderRadius:8,border:"1px solid #e2e8f0"}}>
                      📞 Contactar a <strong>{d.nombre}</strong> — {d.pdvsFalla} PDVs sin cobertura en {d.zona}
                    </div>
                  </div>
                </div>
              )}
              {esFoco && d.pdvsFalla === 0 && (
                <div style={{marginTop:12,paddingTop:12,borderTop:"1px solid #f1f5f9",fontSize:13,color:"#16a34a",fontWeight:600}}>
                  ✅ Todos los PDVs de este distribuidor están recibiendo el contenido correctamente.
                </div>
              )}
            </div>
          );
        })}
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
        {noLeidas>0 && <button onClick={onMarcarTodas} style={{fontSize:13,color:"#1E6FD9",background:"#E8F0FE",border:"none",borderRadius:8,padding:"6px 12px",cursor:"pointer",fontWeight:600}}>Marcar todas leídas</button>}
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
                  {!a.leida && <button onClick={()=>onMarcarLeida(a.id)} style={{fontSize:12,color:"#1E6FD9",background:"none",border:"none",cursor:"pointer",fontWeight:600,padding:0}}>✓ Leída</button>}
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
  const filtros = [{id:"todos",label:"Todos"},{id:"activo",label:"Activos"},{id:"inactivo",label:"Programados"}];

  return (
    <div style={{minHeight:"100vh",background:"#F5F5F5",fontFamily:"'Roboto',system-ui,sans-serif",paddingBottom:64}}>

      {/* HEADER */}
      <div style={{background:"#fff",borderBottom:"1px solid #e2e8f0",padding:"0 32px",position:"sticky",top:0,zIndex:50}}>
        <div className="pvu-header-wrap" style={{maxWidth:1200,margin:"0 auto"}}>
          <div className="pvu-header-top" style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"20px 0 0"}}>

            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{display:"flex",alignItems:"center",gap:4,flexShrink:0}}><span style={{fontSize:22,fontWeight:800,color:"#1E6FD9",letterSpacing:"-0.03em",fontFamily:"Roboto,sans-serif"}}>Tokin</span><span style={{width:8,height:8,borderRadius:"50%",background:"#1E6FD9",display:"inline-block",marginBottom:10}}></span></div>
              <div>
                <div style={{fontSize:18,fontWeight:800,color:"#1e293b",letterSpacing:"-0.02em"}}>Panel de Verdad Única</div>
                <div className="pvu-logo-subtitle" style={{fontSize:12,color:"#94a3b8"}}>Estado en tiempo real</div>
              </div>
            </div>

            <div className="pvu-header-actions" style={{display:"flex",alignItems:"center",gap:10}}>
              
              
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
                style={{padding:"10px 20px",border:"none",background:"transparent",cursor:"pointer",fontSize:14,fontWeight:tab===t.id?700:500,color:tab===t.id?"#1E6FD9":"#64748b",borderBottom:tab===t.id?"2px solid #1E6FD9":"2px solid transparent",transition:"all 0.15s",display:"flex",alignItems:"center",gap:8,whiteSpace:"nowrap"}}>
                {t.icon} {t.label}
                {t.count!==null && <span style={{background:tab===t.id?"#E8F0FE":"#f1f5f9",color:tab===t.id?"#1E6FD9":"#94a3b8",borderRadius:99,padding:"1px 8px",fontSize:11,fontWeight:700}}>{t.count}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="pvu-content" style={{maxWidth:1200,margin:"0 auto",padding:"28px 32px"}}>
        {tab!=="calendario" && tab!=="alertas" && tab!=="historial" && tab!=="distribuidores" && (
          <div className="pvu-filtros" style={{display:"flex",gap:8,marginBottom:20}}>
            {filtros.map(f=>(
              <button key={f.id} onClick={()=>setFiltro(f.id)}
                style={{padding:"6px 14px",border:`1px solid ${filtro===f.id?"#1E6FD9":"#e2e8f0"}`,borderRadius:8,background:filtro===f.id?"#E8F0FE":"#fff",color:filtro===f.id?"#1E6FD9":"#64748b",fontSize:13,fontWeight:filtro===f.id?600:400,cursor:"pointer",whiteSpace:"nowrap"}}>
                {f.label}
              </button>
            ))}
          </div>
        )}
        {tab==="historial" && (
          <div style={{marginBottom:20}}>
            <div style={{fontSize:20,fontWeight:800,color:"#1e293b",letterSpacing:"-0.02em"}}>Historial de promociones finalizadas</div>
            <div style={{fontSize:13,color:"#94a3b8",marginTop:4}}>Cobertura y datos de venta de campañas cerradas</div>
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
            <span style={{fontSize:10,fontWeight:tab===t.id?700:400,color:tab===t.id?"#1E6FD9":"#94a3b8"}}>{t.label}</span>
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
