import { useState, useEffect, useCallback } from 'react';

const EXCL = new Set([59,82,122,123,84,85,87,92,94,97,105,106,109,117,119,120,124,126,139,141,144,145,148,149,151,154,155,157,158,163,164,165,167,168]);
const ALL_B = {1:'¿Conoce bien a Dios?',2:'¿Sobreviviremos a los últimos días?',3:'Avancemos con la organización unida de Jehová',4:'El mundo que nos rodea prueba que Dios existe',5:'Ayuda práctica para las familias',6:'Qué aprendemos del diluvio universal',7:'Imitemos al Padre de tiernas misericordias',8:'Vivamos para hacer la voluntad de Dios',9:'Escuchemos y pongamos en práctica la Palabra de Dios',10:'Seamos honrados en todo',11:'Imitemos a Jesús y no seamos parte del mundo',12:'A Dios le importa cómo vemos la autoridad',13:'Cómo ve Dios el sexo y el matrimonio',14:'Un pueblo limpio da gloria a Jehová',15:'Hagamos el bien a todos',16:'Fortalezcamos nuestra amistad con Dios',17:'Demos gloria a Dios con todo lo que tenemos',18:'Haga de Jehová su fortaleza',19:'Cómo puede usted conocer su futuro',20:'¿Ha llegado el tiempo para que Dios gobierne el mundo?',21:'Valoremos nuestro lugar en el Reino de Dios',22:'¿Aprovecha usted todas las ayudas espirituales?',23:'La vida tiene propósito',24:'¿Ha encontrado usted una perla muy valiosa?',25:'Luchemos contra el espíritu del mundo',26:'¿Le importamos a Dios?',27:'Cómo iniciar bien el matrimonio',28:'Muestre respeto y amor en su matrimonio',29:'Las responsabilidades que tienen los padres',30:'Cómo mejorar la comunicación en la familia',31:'¿Estamos al tanto de nuestras necesidades espirituales?',32:'Cómo enfrentarse a las inquietudes de la vida',33:'¿Habrá algún día justicia para todos?',34:'¿Tendrá usted la marca para sobrevivir?',35:'¿Se puede vivir para siempre?',36:'¿Es esta vida todo lo que podemos esperar?',37:'¿Por qué andar en el camino de Dios?',38:'¿Cómo puede usted sobrevivir al fin del mundo?',39:'¿En qué sentido es Jesucristo el vencedor del mundo?',40:'¿Qué sucederá en el futuro cercano?',41:'Estense quietos y vean cómo los salva Jehová',42:'¿Puede el amor vencer al odio?',43:'Lo que Dios espera de nosotros siempre nos beneficia',44:'¿Cómo le benefician a usted las enseñanzas de Jesús?',45:'Sigamos el camino que lleva a la vida',46:'Mantengamos nuestra confianza fuerte hasta el fin',47:'Tengan fe en las buenas noticias',48:'Cómo ser leales ante las pruebas',49:'¿Viviremos algún día en una Tierra limpia?',50:'Cómo tomar buenas decisiones',51:'¿Está la verdad transformando su vida?',52:'¿Quién es su Dios?',53:'¿Piensa usted igual que Dios?',54:'Tenga fe en Dios y sus promesas',55:'¿Cómo puede ganarse una buena reputación ante Dios?',56:'¿En qué líder podemos confiar?',57:'Aguantemos la persecución',58:'¿Quiénes son los verdaderos discípulos de Cristo?',60:'¿Cuál es su propósito en la vida?',61:'¿En las promesas de quién confía usted?',62:'¿Dónde encontrará una esperanza segura?',63:'¿Es posible encontrar la verdad?',64:'¿Amamos los placeres en vez de a Dios?',65:'¿Cómo podemos ser pacíficos en un mundo violento?',66:'¿Será usted un buen trabajador en la cosecha?',67:'Medite en la Palabra de Jehová y en su creación',68:'Sigan perdonándose con generosidad',69:'¿Por qué es importante mostrar amor desinteresado?',70:'¿Por qué se merece Dios toda nuestra confianza?',71:'Ahora es el momento de estar despiertos',72:'El amor identifica a la religión verdadera',73:'Consigamos que nuestro corazón sea sabio',74:'Jehová está pendiente de nosotros',75:'Demuestre que apoya el gobierno de Dios',76:'¿Pueden los principios bíblicos ayudarnos?',77:'Sean siempre hospitalarios',78:'Sirva a Jehová con alegría',79:'¿A quién prefiere como amigo?',80:'¿Confía usted en la ciencia o en la Biblia?',81:'¿Quiénes están preparados para hacer discípulos?',83:'¿Tienen que obedecer los cristianos los Diez Mandamientos?',86:'Cómo lograr que Dios escuche nuestras oraciones',88:'Por qué vivir de acuerdo con las normas de la Biblia',89:'Venga a beber el agua de la verdad',90:'Esfuércese por conseguir la vida que realmente es vida',91:'La presencia y la gobernación del Mesías',93:'¿Cuándo se acabarán los desastres naturales?',95:'No caiga en la trampa del ocultismo',96:'¿Cuál es el futuro de la religión?',98:'La escena de este mundo está cambiando',99:'Por qué se puede confiar en la Biblia',100:'Haga amistades que duren para siempre',101:'Jehová el Gran Creador',102:'Prestémosle atención a la palabra profética',103:'Cómo ser verdaderamente felices',104:'Padres ¿están construyendo con materiales resistentes al fuego?',107:'Eduquemos nuestra conciencia y nos irá bien',108:'Mire al futuro sin miedo',110:'La familia feliz es la que pone a Dios en primer lugar',111:'La humanidad recuperará la salud por completo',112:'Mostremos amor en un mundo egoísta',113:'Joven ¿cómo puedes ser feliz y tener éxito?',114:'Aprecie las maravillas de la creación de Dios',115:'Protéjase de las astutas trampas de Satanás',116:'Sea sabio al elegir sus compañías',118:'Veamos a los jóvenes como los ve Jehová',121:'Una hermandad mundial sobrevivirá a la mayor calamidad',125:'Por qué necesita la humanidad un rescate',127:'¿Qué nos sucede cuando morimos?',128:'¿Es el infierno realmente un lugar de tormento?',129:'¿Enseña la Biblia que Dios es una trinidad?',130:'La Tierra existirá para siempre',131:'Pongámonos en contra del Diablo',132:'La resurrección una victoria sobre la muerte',133:'¿Importa lo que creemos sobre el origen de los seres humanos?',134:'¿Deben los cristianos observar el sábado?',135:'La santidad de la vida y la sangre',136:'¿Aprueba Dios las imágenes en la adoración?',137:'¿De verdad tuvieron lugar los milagros de la Biblia?',138:'Vivamos con buen juicio en un mundo perverso',140:'¿Quién es Jesucristo en realidad?',142:'Por qué refugiarse en Jehová',143:'Confiemos en el Dios de todo consuelo',146:'Utilice la educación para alabar a Jehová',147:'Confiemos en que Jehová tiene el poder para salvarnos',150:'¿Está este mundo condenado a la destrucción?',152:'¿Cuándo y por qué vendrá el verdadero Armagedón?',153:'Estemos muy pendientes del impresionante día de Jehová',156:'¿Es el Día del Juicio un tiempo de temor o de esperanza?',159:'Cómo encontrar seguridad en un mundo peligroso',160:'Protejamos nuestra identidad cristiana',161:'¿Por qué sufrió y murió Jesús?',162:'Liberados de un mundo de oscuridad',166:'¿Qué es la verdadera fe y cómo se demuestra?',169:'¿Por qué debemos guiarnos por la Biblia?',170:'¿Quién es el único que puede gobernar bien a la humanidad?',171:'Usted puede disfrutar de la vida en paz ahora y para siempre',172:'¿Qué posición tenemos ante Dios?',173:'¿Le importa a Dios qué religión tengamos?',174:'¿Quién será digno de entrar en el nuevo mundo de Dios?',175:'¿Qué pruebas demuestran la autenticidad de la Biblia?',176:'¿Cuándo tendremos verdadera paz y seguridad?',177:'¿A quién podemos acudir en tiempos de angustia?',178:'Andemos en el camino de la integridad',179:'Rechace las fantasías mundanales busque las realidades del Reino',180:'¿Por qué debe ser real para nosotros la esperanza de la resurrección?',181:'¿Faltará menos de lo que usted cree?',182:'¿Qué está haciendo por nosotros el Reino de Dios?',183:'Alejemos la mirada de lo que es inútil',184:'¿Es la muerte el final de todo?',185:'¿Influye la verdad en su vida?',186:'Unidos al feliz pueblo de Dios',187:'¿Cómo es posible que un Dios de amor permita la maldad?',188:'¿Ha puesto usted su confianza en Jehová?',189:'Andar con Dios nos beneficia ahora y para siempre',190:'Una familia unida y feliz para siempre',191:'Cómo vencen al mundo la fe y el amor',192:'¿Anda usted por el camino que lleva a la vida eterna?',193:'Pronto se nos librará de la angustia mundial',194:'Cómo nos beneficia la sabiduría divina'};
const BOSQUEJOS = Object.entries(ALL_B).filter(([n]) => !EXCL.has(parseInt(n))).map(([n, t]) => ({ n: parseInt(n), t }));
const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

function getSundays(year) {
  const s = [];
  for (let m = 0; m < 12; m++) {
    const d = new Date(year, m, 1);
    while (d.getDay() !== 0) d.setDate(d.getDate() + 1);
    while (d.getMonth() === m) { s.push(new Date(d)); d.setDate(d.getDate() + 7); }
  }
  return s;
}

function dateStr(d) { return d.toISOString().split('T')[0]; }
function fmtDate(ds) { const d = new Date(ds + 'T12:00:00'); return d.toLocaleDateString('es-PY', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); }
function fmtShort(ds) { const d = new Date(ds + 'T12:00:00'); return d.toLocaleDateString('es-PY', { day: 'numeric', month: 'long' }); }

export default function App() {
  const [screen, setScreen] = useState('login');
  const [role, setRole] = useState(null);
  const [pwd, setPwd] = useState('');
  const [loginError, setLoginError] = useState('');
  const [assignments, setAssignments] = useState({});
  const [pending, setPending] = useState(false);
  const [savedSnap, setSavedSnap] = useState('{}');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [view, setView] = useState('bosquejos');
  const [curYear, setCurYear] = useState(2026);
  const [sortMode, setSortMode] = useState('num');
  const [searchBQ, setSearchBQ] = useState('');
  const [detailMonth, setDetailMonth] = useState(null);
  const [histYear, setHistYear] = useState(null);
  const [histMonth, setHistMonth] = useState(null);
  // Modals
  const [modalBQ, setModalBQ] = useState(null); // { num }
  const [modalSunday, setModalSunday] = useState(null); // { date, assignment }
  const [modalBQSel, setModalBQSel] = useState(false);
  const [bqSelSearch, setBqSelSearch] = useState('');
  const [sunBQNum, setSunBQNum] = useState(null);
  // Form state
  const [form, setForm] = useState({});

  const isRecent = useCallback((num, excl = null) => {
    const ago = new Date(); ago.setMonth(ago.getMonth() - 6);
    return Object.entries(assignments).some(([ds, a]) => ds !== excl && a.bqNum === num && new Date(ds + 'T12:00:00') >= ago);
  }, [assignments]);

  const lastDate = useCallback((num) => {
    return Object.entries(assignments).filter(([, a]) => a.bqNum === num).map(([ds]) => ds).sort().reverse()[0] || null;
  }, [assignments]);

  async function doLogin() {
    setLoading(true);
    setLoginError('');
    try {
      const res = await fetch('/api/assignments', { headers: { 'x-password': pwd } });
      if (res.status === 401) { setLoginError('Contraseña incorrecta'); setLoading(false); return; }
      const data = await res.json();
      setAssignments(data.assignments || {});
      setSavedSnap(JSON.stringify(data.assignments || {}));
      setRole(data.role);
      // Init sheet headers on first admin login
      if (data.role === 'admin') {
        await fetch('/api/init', { headers: { 'x-password': pwd } });
      }
      setScreen('app');
    } catch (e) {
      setLoginError('Error de conexión');
    }
    setLoading(false);
  }

  function markChanged(newAssignments) {
    setAssignments(newAssignments);
    setPending(true);
  }

  async function saveToSheet() {
    setSaving(true);
    try {
      await fetch('/api/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-password': pwd },
        body: JSON.stringify({ assignments }),
      });
      setSavedSnap(JSON.stringify(assignments));
      setPending(false);
    } catch (e) { console.error(e); }
    setSaving(false);
  }

  function discardChanges() {
    setAssignments(JSON.parse(savedSnap));
    setPending(false);
  }

  function doLogout() {
    if (pending && !confirm('Tenés cambios sin guardar. ¿Salir de todas formas?')) return;
    setScreen('login'); setRole(null); setPwd(''); setAssignments({}); setPending(false);
  }

  // SAVE BQ MODAL
  function saveBQModal() {
    const isAsamblea = form.asamblea;
    const ds = form.date;
    if (!ds) return alert('Elegí una fecha');
    const newA = { ...assignments };
    if (isAsamblea) { newA[ds] = { asamblea: true }; }
    else { newA[ds] = { bqNum: modalBQ.num, name: form.name || '', cong: form.cong || '', tel: form.tel || '' }; }
    markChanged(newA);
    setModalBQ(null);
  }

  // SAVE SUNDAY MODAL
  function saveSundayModal() {
    const isAsamblea = form.asamblea;
    const ds = modalSunday.date;
    const newA = { ...assignments };
    if (isAsamblea) { newA[ds] = { asamblea: true }; }
    else {
      if (!sunBQNum) return alert('Elegí un bosquejo');
      newA[ds] = { bqNum: sunBQNum, name: form.name || '', cong: form.cong || '', tel: form.tel || '' };
    }
    markChanged(newA);
    setModalSunday(null); setSunBQNum(null);
  }

  function deleteSunday() {
    if (!confirm('¿Borrar esta asignación?')) return;
    const newA = { ...assignments };
    delete newA[modalSunday.date];
    markChanged(newA);
    setModalSunday(null);
  }

  // UI helpers
  function MonthDots({ year, month }) {
    const sundays = getSundays(year).filter(s => s.getMonth() === month);
    return (
      <div style={{ display: 'flex', gap: 5, marginTop: 10, flexWrap: 'wrap' }}>
        {sundays.map(s => {
          const a = assignments[dateStr(s)];
          const cls = a ? a.asamblea ? '#B8C8E8' : '#A8D4B8' : '#E8E0D4';
          return <div key={dateStr(s)} style={{ width: 9, height: 9, borderRadius: '50%', background: cls }} />;
        })}
      </div>
    );
  }

  if (screen === 'login') return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '32px 28px', position: 'relative', zIndex: 1 }}>
      <div style={{ fontSize: 34, fontWeight: 300, color: '#2C2820', letterSpacing: -1, marginBottom: 4 }}>Arreglos</div>
      <div style={{ fontSize: 11, fontWeight: 300, color: '#B0A898', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 44 }}>de Conferencias · Ypacaraí</div>
      <div style={{ width: '100%', maxWidth: 340 }}>
        <div style={{ fontSize: 10, fontWeight: 500, color: '#B0A898', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 7 }}>Contraseña</div>
        <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} onKeyDown={e => e.key === 'Enter' && doLogin()}
          placeholder="Ingresá tu contraseña"
          style={{ width: '100%', background: 'rgba(255,255,255,.85)', border: '.5px solid rgba(44,40,32,.12)', borderRadius: 10, padding: '13px 16px', fontSize: 15, fontWeight: 300, color: '#2C2820', fontFamily: 'Geist, system-ui, sans-serif', outline: 'none', letterSpacing: '.05em' }} />
        <button onClick={doLogin} disabled={loading}
          style={{ width: '100%', padding: '13px 0', borderRadius: 100, border: 'none', background: '#B8D8C4', color: '#2A5A3E', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'Geist, system-ui, sans-serif', marginTop: 12 }}>
          {loading ? 'Verificando...' : 'Ingresar'}
        </button>
        {loginError && <div style={{ fontSize: 12, color: '#C07A5A', textAlign: 'center', marginTop: 10 }}>{loginError}</div>}
      </div>
      <div style={{ fontSize: 11, color: '#D0C8BE', textAlign: 'center', marginTop: 24, fontWeight: 300 }}>Congregación Ypacaraí</div>
    </div>
  );

  const bqList = BOSQUEJOS
    .filter(b => !searchBQ || b.n.toString().includes(searchBQ) || b.t.toLowerCase().includes(searchBQ.toLowerCase()))
    .sort((a, b) => sortMode === 'old' ? (lastDate(a.n) || '0').localeCompare(lastDate(b.n) || '0') : a.n - b.n);

  const histEntries = Object.entries(assignments)
    .filter(([, a]) => a.bqNum)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .filter(([ds]) => !histYear || ds.startsWith(histYear))
    .filter(([ds]) => histMonth === null || parseInt(ds.substring(5, 7)) - 1 === histMonth);

  const histYears = [...new Set(Object.entries(assignments).filter(([, a]) => a.bqNum).map(([ds]) => ds.substring(0, 4)))].sort().reverse();
  const histMonths = histYear ? [...new Set(Object.entries(assignments).filter(([, a]) => a.bqNum).filter(([ds]) => ds.startsWith(histYear)).map(([ds]) => parseInt(ds.substring(5, 7)) - 1))] : [];

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', minHeight: '100vh', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>

      {/* TOPBAR */}
      <div style={{ padding: '16px 22px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#F5F1EA', zIndex: 10, borderBottom: '.5px solid rgba(44,40,32,.07)' }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 500, color: '#2C2820', letterSpacing: '-.2px' }}>Arreglos</div>
          <div style={{ fontSize: 10, fontWeight: 300, color: '#B0A898', letterSpacing: '.04em' }}>{role === 'admin' ? 'Administrador' : 'Colaborador'}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={doLogout} style={{ fontSize: 11, color: '#C0B8B0', cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'Geist, system-ui, sans-serif' }}>Salir</button>
          {['bosquejos', 'agenda', 'historial'].map(v => {
            const icons = {
              bosquejos: <path d="M4 5h12M4 10h12M4 15h7" />,
              agenda: <><rect x="3" y="4" width="14" height="13" rx="2" /><path d="M7 2v4M13 2v4M3 9h14" /></>,
              historial: <><circle cx="10" cy="10" r="7" /><path d="M10 6v4l3 2" /></>
            };
            return (
              <button key={v} onClick={() => { setView(v); setDetailMonth(null); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: 0 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={view === v ? '#4A7C5E' : '#C0B8B0'} strokeWidth="1.3">{icons[v]}</svg>
                <span style={{ fontSize: 9, fontWeight: 400, color: view === v ? '#4A7C5E' : '#C0B8B0', letterSpacing: '.04em', textTransform: 'uppercase' }}>{v}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEWS */}
      <div style={{ flex: 1, padding: '16px 22px 80px', overflowY: 'auto' }}>

        {/* BOSQUEJOS */}
        {view === 'bosquejos' && (
          <div>
            <div style={{ position: 'relative', marginBottom: 14 }}>
              <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#B0A898' }} width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="6.5" cy="6.5" r="4.5" /><path d="M10 10l3 3" /></svg>
              <input value={searchBQ} onChange={e => setSearchBQ(e.target.value)} placeholder="Buscar por número o título..."
                style={{ width: '100%', background: 'rgba(255,255,255,.8)', border: '.5px solid rgba(44,40,32,.12)', borderRadius: 10, padding: '11px 14px 11px 38px', fontSize: 14, fontWeight: 300, color: '#2C2820', fontFamily: 'Geist, system-ui, sans-serif', outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              {['num', 'old'].map(m => (
                <button key={m} onClick={() => setSortMode(m)}
                  style={{ fontSize: 11, padding: '5px 12px', borderRadius: 20, border: '.5px solid', borderColor: sortMode === m ? 'rgba(74,124,94,.25)' : 'rgba(44,40,32,.12)', background: sortMode === m ? '#E8F0EB' : 'rgba(255,255,255,.6)', color: sortMode === m ? '#4A7C5E' : '#8A8278', cursor: 'pointer', fontFamily: 'Geist, system-ui, sans-serif' }}>
                  {m === 'num' ? 'Numérico' : 'Sin asignar primero'}
                </button>
              ))}
            </div>
            {bqList.length === 0 && <div style={{ textAlign: 'center', padding: '40px 0', color: '#C0B8B0', fontSize: 13 }}>Sin resultados</div>}
            {bqList.map(b => {
              const ld = lastDate(b.n);
              const rec = isRecent(b.n);
              return (
                <div key={b.n} onClick={() => { setModalBQ({ num: b.n }); setForm({}); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(255,255,255,.75)', border: '.5px solid rgba(44,40,32,.08)', borderRadius: 12, padding: '14px 16px', marginBottom: 8, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                  {rec && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: '#F2C4B0' }} />}
                  {!ld && !rec && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: '#C8E2D4' }} />}
                  <div style={{ fontSize: 22, fontWeight: 300, color: '#B0A898', width: 42, textAlign: 'center', letterSpacing: '-.5px' }}>{b.n}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 400, color: '#2C2820', lineHeight: 1.35 }}>{b.t}</div>
                    <div style={{ fontSize: 11, fontWeight: 300, color: rec ? '#C07A5A' : '#B0A898', marginTop: 3 }}>
                      {rec ? `⚠ Presentado recientemente · ${fmtShort(ld)}` : ld ? `Último: ${fmtShort(ld)}` : 'Nunca presentado'}
                    </div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#D0C8BE" strokeWidth="1.2"><path d="M5 2l4 5-4 5" /></svg>
                </div>
              );
            })}
          </div>
        )}

        {/* AGENDA */}
        {view === 'agenda' && !detailMonth && (
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              {[2026, 2027].map(y => (
                <button key={y} onClick={() => setCurYear(y)}
                  style={{ flex: 1, padding: '9px 0', borderRadius: 10, border: '.5px solid', borderColor: curYear === y ? 'rgba(74,124,94,.25)' : 'rgba(44,40,32,.12)', background: curYear === y ? '#E8F0EB' : 'rgba(255,255,255,.6)', fontSize: 13, fontWeight: curYear === y ? 500 : 400, color: curYear === y ? '#4A7C5E' : '#8A8278', cursor: 'pointer', fontFamily: 'Geist, system-ui, sans-serif' }}>
                  {y}
                </button>
              ))}
            </div>
            {MONTHS.map((mn, m) => {
              const sundays = getSundays(curYear).filter(s => s.getMonth() === m);
              const filled = sundays.filter(s => assignments[dateStr(s)]).length;
              const cls = filled === sundays.length ? 'complete' : filled > 0 ? 'partial' : 'empty';
              const bgMap = { complete: 'rgba(200,226,212,.4)', partial: 'rgba(248,224,180,.4)', empty: 'rgba(242,196,176,.3)' };
              const borderMap = { complete: 'rgba(74,124,94,.2)', partial: 'rgba(180,140,60,.2)', empty: 'rgba(192,122,90,.2)' };
              const colorMap = { complete: '#4A7C5E', partial: '#9A7830', empty: '#C07A5A' };
              const txtMap = { complete: `Todos los domingos asignados — ${sundays.length}/${sundays.length}`, partial: `${filled} de ${sundays.length} domingos asignados`, empty: `Sin asignaciones — ${sundays.length} domingos` };
              return (
                <div key={m} onClick={() => setDetailMonth(m)}
                  style={{ background: bgMap[cls], border: `.5px solid ${borderMap[cls]}`, borderRadius: 14, padding: '16px 18px', marginBottom: 10, cursor: 'pointer' }}>
                  <div style={{ fontSize: 20, fontWeight: 300, color: '#2C2820', letterSpacing: '-.5px', marginBottom: 4 }}>{mn}</div>
                  <div style={{ fontSize: 11, fontWeight: 400, color: colorMap[cls] }}>{txtMap[cls]}</div>
                  <MonthDots year={curYear} month={m} />
                </div>
              );
            })}
          </div>
        )}

        {/* MONTH DETAIL */}
        {view === 'agenda' && detailMonth !== null && (
          <div>
            <button onClick={() => setDetailMonth(null)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 300, color: '#B0A898', cursor: 'pointer', marginBottom: 16, background: 'none', border: 'none', fontFamily: 'Geist, system-ui, sans-serif', padding: 0 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M9 2L4 7l5 5" /></svg>
              {curYear}
            </button>
            <div style={{ fontSize: 28, fontWeight: 300, color: '#2C2820', letterSpacing: -1, marginBottom: 4 }}>{MONTHS[detailMonth]}</div>
            <div style={{ fontSize: 12, color: '#B0A898', marginBottom: 18, fontWeight: 300 }}>{curYear}</div>
            {getSundays(curYear).filter(s => s.getMonth() === detailMonth).map(s => {
              const ds = dateStr(s);
              const a = assignments[ds];
              const lbl = s.toLocaleDateString('es-PY', { day: 'numeric', month: 'long' });
              const bgCard = a ? a.asamblea ? 'rgba(184,200,232,.3)' : 'rgba(200,226,212,.35)' : 'rgba(255,255,255,.75)';
              const borderCard = a ? a.asamblea ? 'rgba(100,130,200,.2)' : 'rgba(74,124,94,.2)' : 'rgba(44,40,32,.08)';
              return (
                <div key={ds} onClick={() => { setModalSunday({ date: ds, assignment: a }); setSunBQNum(a?.bqNum || null); setForm({ asamblea: a?.asamblea || false, name: a?.name || '', cong: a?.cong || '', tel: a?.tel || '' }); }}
                  style={{ background: bgCard, border: `.5px solid ${borderCard}`, borderRadius: 12, padding: '14px 16px', marginBottom: 8, cursor: 'pointer' }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#2C2820', marginBottom: 3 }}>Domingo {lbl}</div>
                  {a?.asamblea && <div style={{ fontSize: 12, fontWeight: 300, color: '#6A6258' }}>🏛 Fin de semana de asamblea</div>}
                  {a?.bqNum && <><div style={{ fontSize: 12, fontWeight: 300, color: '#6A6258' }}>{a.name || '—'} · {a.cong || '—'}{a.tel ? ' · ' + a.tel : ''}</div><div style={{ fontSize: 11, color: '#B0A898', marginTop: 2 }}>{a.bqNum} — {ALL_B[a.bqNum] || ''}</div></>}
                  {!a && <div style={{ fontSize: 12, color: '#C0B8B0', fontStyle: 'italic' }}>Sin asignar</div>}
                </div>
              );
            })}
          </div>
        )}

        {/* HISTORIAL */}
        {view === 'historial' && (
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
              <button onClick={() => { setHistYear(null); setHistMonth(null); }}
                style={{ fontSize: 11, padding: '5px 12px', borderRadius: 20, border: '.5px solid', borderColor: !histYear ? 'rgba(74,124,94,.25)' : 'rgba(44,40,32,.12)', background: !histYear ? '#E8F0EB' : 'rgba(255,255,255,.6)', color: !histYear ? '#4A7C5E' : '#8A8278', cursor: 'pointer', fontFamily: 'Geist, system-ui, sans-serif' }}>Todo</button>
              {histYears.map(y => (
                <button key={y} onClick={() => { setHistYear(y); setHistMonth(null); }}
                  style={{ fontSize: 11, padding: '5px 12px', borderRadius: 20, border: '.5px solid', borderColor: histYear === y ? 'rgba(74,124,94,.25)' : 'rgba(44,40,32,.12)', background: histYear === y ? '#E8F0EB' : 'rgba(255,255,255,.6)', color: histYear === y ? '#4A7C5E' : '#8A8278', cursor: 'pointer', fontFamily: 'Geist, system-ui, sans-serif' }}>{y}</button>
              ))}
              {histYear && histMonths.map(m => (
                <button key={m} onClick={() => setHistMonth(m)}
                  style={{ fontSize: 11, padding: '5px 12px', borderRadius: 20, border: '.5px solid', borderColor: histMonth === m ? 'rgba(74,124,94,.25)' : 'rgba(44,40,32,.12)', background: histMonth === m ? '#E8F0EB' : 'rgba(255,255,255,.6)', color: histMonth === m ? '#4A7C5E' : '#8A8278', cursor: 'pointer', fontFamily: 'Geist, system-ui, sans-serif' }}>{MONTHS[m]}</button>
              ))}
            </div>
            {histEntries.length === 0 && <div style={{ textAlign: 'center', padding: '40px 0', color: '#C0B8B0', fontSize: 13 }}>Sin registros</div>}
            {histEntries.map(([ds, a]) => (
              <div key={ds} style={{ background: 'rgba(255,255,255,.75)', border: '.5px solid rgba(44,40,32,.08)', borderRadius: 12, padding: '14px 16px', marginBottom: 8 }}>
                <div style={{ fontSize: 11, color: '#B0A898', marginBottom: 4, fontWeight: 300 }}>{fmtDate(ds)}</div>
                <div><span style={{ fontSize: 13, fontWeight: 500, color: '#4A7C5E', marginRight: 6 }}>{a.bqNum}</span><span style={{ fontSize: 13, fontWeight: 400, color: '#2C2820' }}>{ALL_B[a.bqNum] || ''}</span></div>
                <div style={{ fontSize: 11, color: '#8A8278', marginTop: 3, fontWeight: 300 }}>{[a.name, a.cong, a.tel].filter(Boolean).join(' · ')}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SAVE BANNER */}
      {pending && (
        <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 400, background: '#2C2820', padding: '14px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 50 }}>
          <div style={{ fontSize: 12, fontWeight: 400, color: 'rgba(255,255,255,.85)' }}>¿Deseás confirmar y guardar?</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={discardChanges} style={{ fontSize: 11, fontWeight: 500, padding: '6px 14px', borderRadius: 20, border: 'none', background: 'rgba(255,255,255,.12)', color: 'rgba(255,255,255,.7)', cursor: 'pointer', fontFamily: 'Geist, system-ui, sans-serif' }}>Descartar</button>
            <button onClick={saveToSheet} disabled={saving} style={{ fontSize: 11, fontWeight: 500, padding: '6px 14px', borderRadius: 20, border: 'none', background: '#B8D8C4', color: '#2A5A3E', cursor: 'pointer', fontFamily: 'Geist, system-ui, sans-serif' }}>{saving ? 'Guardando...' : 'Guardar'}</button>
          </div>
        </div>
      )}

      {/* MODAL: BQ */}
      {modalBQ && (
        <div onClick={e => e.target === e.currentTarget && setModalBQ(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(44,40,32,.35)', zIndex: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div style={{ background: '#F5F1EA', borderRadius: '20px 20px 0 0', padding: '24px 22px 36px', width: '100%', maxWidth: 400, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#2C2820', marginBottom: 3 }}>Bosquejo {modalBQ.num}</div>
            <div style={{ fontSize: 11, color: '#8A8278', marginBottom: 18, lineHeight: 1.4, fontWeight: 300 }}>{ALL_B[modalBQ.num]}</div>
            {isRecent(modalBQ.num) && (
              <div style={{ background: '#FAE8DC', border: '.5px solid rgba(192,122,90,.3)', borderRadius: 8, padding: '10px 12px', marginBottom: 14, fontSize: 12, color: '#A06040' }}>
                ⚠ Este bosquejo fue presentado en los últimos 6 meses ({fmtShort(lastDate(modalBQ.num))})
              </div>
            )}
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: 'rgba(184,200,232,.25)', border: '.5px solid rgba(100,130,200,.2)', borderRadius: 10, cursor: 'pointer', marginBottom: 16 }}>
              <input type="checkbox" checked={form.asamblea || false} onChange={e => setForm(f => ({ ...f, asamblea: e.target.checked }))} style={{ width: 16, height: 16, accentColor: '#4A6090' }} />
              <span style={{ fontSize: 13, fontWeight: 400, color: '#3A5080' }}>Fin de semana de asamblea</span>
            </label>
            {!form.asamblea && (
              <>
                <Field label="Fecha (domingo)" type="date" value={form.date || ''} onChange={v => setForm(f => ({ ...f, date: v }))} />
                <Field label="Conferenciante" placeholder="Nombre y apellido" value={form.name || ''} onChange={v => setForm(f => ({ ...f, name: v }))} />
                <Field label="Congregación" placeholder="De dónde proviene" value={form.cong || ''} onChange={v => setForm(f => ({ ...f, cong: v }))} />
                <Field label="Teléfono" placeholder="09xx xxx xxx" value={form.tel || ''} onChange={v => setForm(f => ({ ...f, tel: v }))} />
              </>
            )}
            <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
              <Btn onClick={() => setModalBQ(null)} secondary>Cancelar</Btn>
              <Btn onClick={saveBQModal}>Confirmar</Btn>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SUNDAY */}
      {modalSunday && !modalBQSel && (
        <div onClick={e => e.target === e.currentTarget && setModalSunday(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(44,40,32,.35)', zIndex: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div style={{ background: '#F5F1EA', borderRadius: '20px 20px 0 0', padding: '24px 22px 36px', width: '100%', maxWidth: 400, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#2C2820', marginBottom: 18 }}>{fmtDate(modalSunday.date)}</div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: 'rgba(184,200,232,.25)', border: '.5px solid rgba(100,130,200,.2)', borderRadius: 10, cursor: 'pointer', marginBottom: 16 }}>
              <input type="checkbox" checked={form.asamblea || false} onChange={e => setForm(f => ({ ...f, asamblea: e.target.checked }))} style={{ width: 16, height: 16, accentColor: '#4A6090' }} />
              <span style={{ fontSize: 13, fontWeight: 400, color: '#3A5080' }}>Fin de semana de asamblea</span>
            </label>
            {!form.asamblea && (
              <>
                <div style={{ marginBottom: 13 }}>
                  <div style={{ fontSize: 10, fontWeight: 500, color: '#B0A898', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6 }}>Bosquejo</div>
                  <div onClick={() => { setModalBQSel(true); setBqSelSearch(''); }}
                    style={{ background: sunBQNum ? '#EEF4F0' : 'rgba(255,255,255,.85)', border: `.5px solid ${sunBQNum ? 'rgba(74,124,94,.25)' : 'rgba(44,40,32,.12)'}`, borderRadius: 8, padding: '10px 12px', fontSize: 13, color: sunBQNum ? '#2C5A3A' : '#B0A898', cursor: 'pointer' }}>
                    {sunBQNum ? `${sunBQNum} — ${ALL_B[sunBQNum]}` : 'Seleccionar bosquejo →'}
                  </div>
                </div>
                <Field label="Conferenciante" placeholder="Nombre y apellido" value={form.name || ''} onChange={v => setForm(f => ({ ...f, name: v }))} />
                <Field label="Congregación" placeholder="De dónde proviene" value={form.cong || ''} onChange={v => setForm(f => ({ ...f, cong: v }))} />
                <Field label="Teléfono" placeholder="09xx xxx xxx" value={form.tel || ''} onChange={v => setForm(f => ({ ...f, tel: v }))} />
              </>
            )}
            <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
              <Btn onClick={() => { setModalSunday(null); setSunBQNum(null); }} secondary>Cancelar</Btn>
              {modalSunday.assignment && <Btn onClick={deleteSunday} danger>Borrar</Btn>}
              <Btn onClick={saveSundayModal}>Guardar</Btn>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: BQ SELECTOR */}
      {modalBQSel && (
        <div onClick={e => e.target === e.currentTarget && setModalBQSel(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(44,40,32,.35)', zIndex: 110, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div style={{ background: '#F5F1EA', borderRadius: '20px 20px 0 0', padding: '24px 22px 24px', width: '100%', maxWidth: 400, maxHeight: '88vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#2C2820', marginBottom: 12 }}>Elegir bosquejo</div>
            <div style={{ position: 'relative', marginBottom: 10 }}>
              <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#B0A898' }} width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="6.5" cy="6.5" r="4.5" /><path d="M10 10l3 3" /></svg>
              <input value={bqSelSearch} onChange={e => setBqSelSearch(e.target.value)} placeholder="Número o título..."
                style={{ width: '100%', background: 'rgba(255,255,255,.8)', border: '.5px solid rgba(44,40,32,.12)', borderRadius: 10, padding: '10px 14px 10px 38px', fontSize: 14, fontWeight: 300, color: '#2C2820', fontFamily: 'Geist, system-ui, sans-serif', outline: 'none' }} />
            </div>
            <div style={{ overflowY: 'auto', flex: 1 }}>
              {BOSQUEJOS.filter(b => !bqSelSearch || b.n.toString().includes(bqSelSearch) || b.t.toLowerCase().includes(bqSelSearch.toLowerCase())).map(b => {
                const rec = isRecent(b.n);
                return (
                  <div key={b.n} onClick={() => { setSunBQNum(b.n); setModalBQSel(false); }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '11px 14px', borderRadius: 10, cursor: 'pointer', borderBottom: '.5px solid rgba(44,40,32,.05)', borderLeft: rec ? '3px solid #F2C4B0' : 'none' }}>
                    <div style={{ fontSize: 16, fontWeight: 300, color: '#B0A898', width: 34, flexShrink: 0 }}>{b.n}</div>
                    <div>
                      <div style={{ fontSize: 12, color: '#2C2820', lineHeight: 1.3 }}>{b.t}</div>
                      {rec && <div style={{ fontSize: 10, color: '#C07A5A', marginTop: 2 }}>⚠ Presentado recientemente</div>}
                    </div>
                  </div>
                );
              })}
            </div>
            <button onClick={() => setModalBQSel(false)}
              style={{ marginTop: 12, width: '100%', padding: '11px 0', borderRadius: 100, border: 'none', background: 'rgba(44,40,32,.07)', color: '#6A6258', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'Geist, system-ui, sans-serif' }}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, placeholder, value, onChange, type = 'text' }) {
  return (
    <div style={{ marginBottom: 13 }}>
      <div style={{ fontSize: 10, fontWeight: 500, color: '#B0A898', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: '100%', background: value ? '#EEF4F0' : 'rgba(255,255,255,.85)', border: `.5px solid ${value ? 'rgba(74,124,94,.25)' : 'rgba(44,40,32,.12)'}`, borderRadius: 8, padding: '10px 12px', fontSize: 14, fontWeight: 300, color: value ? '#2C5A3A' : '#2C2820', fontFamily: 'Geist, system-ui, sans-serif', outline: 'none' }} />
    </div>
  );
}

function Btn({ children, onClick, secondary, danger }) {
  return (
    <button onClick={onClick}
      style={{ flex: danger ? 'none' : 1, padding: danger ? '11px 16px' : '11px 0', borderRadius: 100, border: 'none', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'Geist, system-ui, sans-serif', background: danger ? 'rgba(192,122,90,.12)' : secondary ? 'rgba(44,40,32,.07)' : '#B8D8C4', color: danger ? '#C07A5A' : secondary ? '#6A6258' : '#2A5A3E' }}>
      {children}
    </button>
  );
}
