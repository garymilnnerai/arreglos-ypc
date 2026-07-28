import { useState, useCallback } from 'react';

const EXCL = new Set([59,82,122,123,84,85,87,92,94,97,105,106,109,117,119,120,124,126,139,141,144,145,148,149,151,154,155,157,158,163,164,165,167,168]);
const ALL_B = {1:'¿Conoce bien a Dios?',2:'¿Sobreviviremos a los últimos días?',3:'Avancemos con la organización unida de Jehová',4:'El mundo que nos rodea prueba que Dios existe',5:'Ayuda práctica para las familias',6:'Qué aprendemos del diluvio universal',7:'Imitemos al Padre de tiernas misericordias',8:'Vivamos para hacer la voluntad de Dios',9:'Escuchemos y pongamos en práctica la Palabra de Dios',10:'Seamos honrados en todo',11:'Imitemos a Jesús y no seamos parte del mundo',12:'A Dios le importa cómo vemos la autoridad',13:'Cómo ve Dios el sexo y el matrimonio',14:'Un pueblo limpio da gloria a Jehová',15:'Hagamos el bien a todos',16:'Fortalezcamos nuestra amistad con Dios',17:'Demos gloria a Dios con todo lo que tenemos',18:'Haga de Jehová su fortaleza',19:'Cómo puede usted conocer su futuro',20:'¿Ha llegado el tiempo para que Dios gobierne el mundo?',21:'Valoremos nuestro lugar en el Reino de Dios',22:'¿Aprovecha usted todas las ayudas espirituales?',23:'La vida tiene propósito',24:'¿Ha encontrado usted una perla muy valiosa?',25:'Luchemos contra el espíritu del mundo',26:'¿Le importamos a Dios?',27:'Cómo iniciar bien el matrimonio',28:'Muestre respeto y amor en su matrimonio',29:'Las responsabilidades que tienen los padres',30:'Cómo mejorar la comunicación en la familia',31:'¿Estamos al tanto de nuestras necesidades espirituales?',32:'Cómo enfrentarse a las inquietudes de la vida',33:'¿Habrá algún día justicia para todos?',34:'¿Tendrá usted la marca para sobrevivir?',35:'¿Se puede vivir para siempre?',36:'¿Es esta vida todo lo que podemos esperar?',37:'¿Por qué andar en el camino de Dios?',38:'¿Cómo puede usted sobrevivir al fin del mundo?',39:'¿En qué sentido es Jesucristo el vencedor del mundo?',40:'¿Qué sucederá en el futuro cercano?',41:'Estense quietos y vean cómo los salva Jehová',42:'¿Puede el amor vencer al odio?',43:'Lo que Dios espera de nosotros siempre nos beneficia',44:'¿Cómo le benefician a usted las enseñanzas de Jesús?',45:'Sigamos el camino que lleva a la vida',46:'Mantengamos nuestra confianza fuerte hasta el fin',47:'Tengan fe en las buenas noticias',48:'Cómo ser leales ante las pruebas',49:'¿Viviremos algún día en una Tierra limpia?',50:'Cómo tomar buenas decisiones',51:'¿Está la verdad transformando su vida?',52:'¿Quién es su Dios?',53:'¿Piensa usted igual que Dios?',54:'Tenga fe en Dios y sus promesas',55:'¿Cómo puede ganarse una buena reputación ante Dios?',56:'¿En qué líder podemos confiar?',57:'Aguantemos la persecución',58:'¿Quiénes son los verdaderos discípulos de Cristo?',60:'¿Cuál es su propósito en la vida?',61:'¿En las promesas de quién confía usted?',62:'¿Dónde encontrará una esperanza segura?',63:'¿Es posible encontrar la verdad?',64:'¿Amamos los placeres en vez de a Dios?',65:'¿Cómo podemos ser pacíficos en un mundo violento?',66:'¿Será usted un buen trabajador en la cosecha?',67:'Medite en la Palabra de Jehová y en su creación',68:'Sigan perdonándose con generosidad',69:'¿Por qué es importante mostrar amor desinteresado?',70:'¿Por qué se merece Dios toda nuestra confianza?',71:'Ahora es el momento de estar despiertos',72:'El amor identifica a la religión verdadera',73:'Consigamos que nuestro corazón sea sabio',74:'Jehová está pendiente de nosotros',75:'Demuestre que apoya el gobierno de Dios',76:'¿Pueden los principios bíblicos ayudarnos?',77:'Sean siempre hospitalarios',78:'Sirva a Jehová con alegría',79:'¿A quién prefiere como amigo?',80:'¿Confía usted en la ciencia o en la Biblia?',81:'¿Quiénes están preparados para hacer discípulos?',83:'¿Tienen que obedecer los cristianos los Diez Mandamientos?',86:'Cómo lograr que Dios escuche nuestras oraciones',88:'Por qué vivir de acuerdo con las normas de la Biblia',89:'Venga a beber el agua de la verdad',90:'Esfuércese por conseguir la vida que realmente es vida',91:'La presencia y la gobernación del Mesías',93:'¿Cuándo se acabarán los desastres naturales?',95:'No caiga en la trampa del ocultismo',96:'¿Cuál es el futuro de la religión?',98:'La escena de este mundo está cambiando',99:'Por qué se puede confiar en la Biblia',100:'Haga amistades que duren para siempre',101:'Jehová el Gran Creador',102:'Prestémosle atención a la palabra profética',103:'Cómo ser verdaderamente felices',104:'Padres ¿están construyendo con materiales resistentes al fuego?',107:'Eduquemos nuestra conciencia y nos irá bien',108:'Mire al futuro sin miedo',110:'La familia feliz es la que pone a Dios en primer lugar',111:'La humanidad recuperará la salud por completo',112:'Mostremos amor en un mundo egoísta',113:'Joven ¿cómo puedes ser feliz y tener éxito?',114:'Aprecie las maravillas de la creación de Dios',115:'Protéjase de las astutas trampas de Satanás',116:'Sea sabio al elegir sus compañías',118:'Veamos a los jóvenes como los ve Jehová',121:'Una hermandad mundial sobrevivirá a la mayor calamidad',125:'Por qué necesita la humanidad un rescate',127:'¿Qué nos sucede cuando morimos?',128:'¿Es el infierno realmente un lugar de tormento?',129:'¿Enseña la Biblia que Dios es una trinidad?',130:'La Tierra existirá para siempre',131:'Pongámonos en contra del Diablo',132:'La resurrección una victoria sobre la muerte',133:'¿Importa lo que creemos sobre el origen de los seres humanos?',134:'¿Deben los cristianos observar el sábado?',135:'La santidad de la vida y la sangre',136:'¿Aprueba Dios las imágenes en la adoración?',137:'¿De verdad tuvieron lugar los milagros de la Biblia?',138:'Vivamos con buen juicio en un mundo perverso',140:'¿Quién es Jesucristo en realidad?',142:'Por qué refugiarse en Jehová',143:'Confiemos en el Dios de todo consuelo',146:'Utilice la educación para alabar a Jehová',147:'Confiemos en que Jehová tiene el poder para salvarnos',150:'¿Está este mundo condenado a la destrucción?',152:'¿Cuándo y por qué vendrá el verdadero Armagedón?',153:'Estemos muy pendientes del impresionante día de Jehová',156:'¿Es el Día del Juicio un tiempo de temor o de esperanza?',159:'Cómo encontrar seguridad en un mundo peligroso',160:'Protejamos nuestra identidad cristiana',161:'¿Por qué sufrió y murió Jesús?',162:'Liberados de un mundo de oscuridad',166:'¿Qué es la verdadera fe y cómo se demuestra?',169:'¿Por qué debemos guiarnos por la Biblia?',170:'¿Quién es el único que puede gobernar bien a la humanidad?',171:'Usted puede disfrutar de la vida en paz ahora y para siempre',172:'¿Qué posición tenemos ante Dios?',173:'¿Le importa a Dios qué religión tengamos?',174:'¿Quién será digno de entrar en el nuevo mundo de Dios?',175:'¿Qué pruebas demuestran la autenticidad de la Biblia?',176:'¿Cuándo tendremos verdadera paz y seguridad?',177:'¿A quién podemos acudir en tiempos de angustia?',178:'Andemos en el camino de la integridad',179:'Rechace las fantasías mundanales busque las realidades del Reino',180:'¿Por qué debe ser real para nosotros la esperanza de la resurrección?',181:'¿Faltará menos de lo que usted cree?',182:'¿Qué está haciendo por nosotros el Reino de Dios?',183:'Alejemos la mirada de lo que es inútil',184:'¿Es la muerte el final de todo?',185:'¿Influye la verdad en su vida?',186:'Unidos al feliz pueblo de Dios',187:'¿Cómo es posible que un Dios de amor permita la maldad?',188:'¿Ha puesto usted su confianza en Jehová?',189:'Andar con Dios nos beneficia ahora y para siempre',190:'Una familia unida y feliz para siempre',191:'Cómo vencen al mundo la fe y el amor',192:'¿Anda usted por el camino que lleva a la vida eterna?',193:'Pronto se nos librará de la angustia mundial',194:'Cómo nos beneficia la sabiduría divina'};
const BOSQUEJOS = Object.entries(ALL_B).filter(([n]) => !EXCL.has(parseInt(n))).map(([n, t]) => ({ n: parseInt(n), t }));
const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

// Paleta Nickel Dark
const D = {
  bg: '#141416',
  bg2: '#1C1C1F',
  bg3: '#242428',
  bg4: '#2C2C31',
  border: 'rgba(255,255,255,0.07)',
  border2: 'rgba(255,255,255,0.12)',
  text: '#E8E8EC',
  text2: '#9A9AA8',
  text3: '#5A5A68',
  accent: '#7B8CDE',
  accentDim: 'rgba(123,140,222,0.15)',
  accentDim2: 'rgba(123,140,222,0.08)',
  green: '#4CAF7D',
  greenDim: 'rgba(76,175,125,0.15)',
  amber: '#E8A838',
  amberDim: 'rgba(232,168,56,0.15)',
  red: '#E05C5C',
  redDim: 'rgba(224,92,92,0.12)',
};

function getSundays(year) {
  const s = [];
  for (let m = 0; m < 12; m++) {
    const d = new Date(year, m, 1);
    while (d.getDay() !== 0) d.setDate(d.getDate() + 1);
    while (d.getMonth() === m) { s.push(new Date(d)); d.setDate(d.getDate() + 7); }
  }
  return s;
}

function getSundaysOfMonth(year, month) {
  return getSundays(year).filter(s => s.getMonth() === month);
}

function dateStr(d) { return d.toISOString().split('T')[0]; }
function fmtDate(ds) { const d = new Date(ds + 'T12:00:00'); return d.toLocaleDateString('es-PY', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); }
function fmtShort(ds) { const d = new Date(ds + 'T12:00:00'); return d.toLocaleDateString('es-PY', { day: 'numeric', month: 'long' }); }

// All available month options from Jul 2026 to Dec 2027
const MONTH_OPTIONS = [];
for (let y = 2026; y <= 2027; y++) {
  const startM = y === 2026 ? 6 : 0;
  for (let m = startM; m < 12; m++) {
    MONTH_OPTIONS.push({ year: y, month: m, label: `${MONTHS[m]} ${y}` });
  }
}

const css = {
  body: { background: D.bg, minHeight: '100vh', color: D.text, fontFamily: 'Geist, system-ui, sans-serif' },
  shell: { maxWidth: 400, margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  topbar: { padding: '14px 20px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: D.bg, zIndex: 10, borderBottom: `1px solid ${D.border}` },
  card: { background: D.bg2, border: `1px solid ${D.border}`, borderRadius: 12 },
  input: { width: '100%', background: D.bg3, border: `1px solid ${D.border2}`, borderRadius: 8, padding: "13px 14px", fontSize: 14, fontWeight: 300, color: D.text, fontFamily: 'Geist, system-ui, sans-serif', outline: 'none' },
  inputFilled: { background: D.accentDim2, borderColor: `rgba(123,140,222,0.3)`, color: D.accent },
  label: { fontSize: 10, fontWeight: 500, color: D.text3, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6 },
  modal: { background: D.bg2, borderRadius: '18px 18px 0 0', padding: '24px 20px 36px', width: '100%', maxWidth: 400, maxHeight: '90vh', overflowY: 'auto', border: `1px solid ${D.border2}`, borderBottom: 'none' },
};

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
  const [modalBQ, setModalBQ] = useState(null);
  const [modalSunday, setModalSunday] = useState(null);
  const [modalBQSel, setModalBQSel] = useState(false);
  const [bqSelSearch, setBqSelSearch] = useState('');
  const [sunBQNum, setSunBQNum] = useState(null);
  const [form, setForm] = useState({});
  // Date selector state for BQ modal
  const [selMonthOpt, setSelMonthOpt] = useState('');
  const [selSunday, setSelSunday] = useState('');

  const isRecent = useCallback((num, excl = null) => {
    const ago = new Date(); ago.setMonth(ago.getMonth() - 6);
    return Object.entries(assignments).some(([ds, a]) => ds !== excl && a.bqNum === num && new Date(ds + 'T12:00:00') >= ago);
  }, [assignments]);

  const lastDate = useCallback((num) => {
    return Object.entries(assignments).filter(([, a]) => a.bqNum === num).map(([ds]) => ds).sort().reverse()[0] || null;
  }, [assignments]);

  async function doLogin() {
    setLoading(true); setLoginError('');
    try {
      const res = await fetch('/api/assignments', { headers: { 'x-password': pwd } });
      if (res.status === 401) { setLoginError('Contraseña incorrecta'); setLoading(false); return; }
      const data = await res.json();
      setAssignments(data.assignments || {});
      setSavedSnap(JSON.stringify(data.assignments || {}));
      setRole(data.role);
      if (data.role === 'admin') await fetch('/api/init', { headers: { 'x-password': pwd } });
      setScreen('app');
    } catch (e) { setLoginError('Error de conexión'); }
    setLoading(false);
  }

  function markChanged(newA) { setAssignments(newA); setPending(true); }

  async function saveToSheet() {
    setSaving(true);
    try {
      await fetch('/api/assignments', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-password': pwd }, body: JSON.stringify({ assignments }) });
      setSavedSnap(JSON.stringify(assignments)); setPending(false);
    } catch (e) { console.error(e); }
    setSaving(false);
  }

  function discardChanges() { setAssignments(JSON.parse(savedSnap)); setPending(false); }

  function doLogout() {
    if (pending && !confirm('Tenés cambios sin guardar. ¿Salir?')) return;
    setScreen('login'); setRole(null); setPwd(''); setAssignments({}); setPending(false);
  }

  // Get sundays for selected month option in BQ modal
  function getSundaysForSel() {
    if (!selMonthOpt) return [];
    const [y, m] = selMonthOpt.split('-').map(Number);
    return getSundaysOfMonth(y, m);
  }

  function saveBQModal() {
    if (form.asamblea) {
      if (!selSunday) return alert('Elegí un domingo');
      const newA = { ...assignments }; newA[selSunday] = { asamblea: true };
      markChanged(newA); setModalBQ(null);
    } else {
      if (!selSunday) return alert('Elegí un domingo');
      const newA = { ...assignments };
      newA[selSunday] = { bqNum: modalBQ.num, name: form.name || '', cong: form.cong || '', tel: form.tel || '' };
      markChanged(newA); setModalBQ(null);
    }
  }

  function saveSundayModal() {
    const ds = modalSunday.date;
    const newA = { ...assignments };
    if (form.asamblea) { newA[ds] = { asamblea: true }; }
    else {
      if (!sunBQNum) return alert('Elegí un bosquejo');
      newA[ds] = { bqNum: sunBQNum, name: form.name || '', cong: form.cong || '', tel: form.tel || '' };
    }
    markChanged(newA); setModalSunday(null); setSunBQNum(null);
  }

  function deleteSunday() {
    if (!confirm('¿Borrar esta asignación?')) return;
    const newA = { ...assignments }; delete newA[modalSunday.date];
    markChanged(newA); setModalSunday(null);
  }

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

  const sundaysForSel = getSundaysForSel();

  // LOGIN
  if (screen === 'login') return (
    <div style={{ ...css.body, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '32px 24px' }}>
      <div style={{ width: '100%', maxWidth: 340 }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 30, fontWeight: 300, color: D.text, letterSpacing: -1 }}>Arreglos</div>
          <div style={{ fontSize: 10, color: D.text3, letterSpacing: '.12em', textTransform: 'uppercase', marginTop: 6 }}>de Conferencias · Ypacaraí</div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <div style={css.label}>Contraseña</div>
          <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} onKeyDown={e => e.key === 'Enter' && doLogin()}
            placeholder="••••••••"
            style={{ ...css.input, fontSize: 16, letterSpacing: '.08em', padding: '13px 16px' }} />
        </div>
        <button onClick={doLogin} disabled={loading}
          style={{ width: '100%', padding: '13px 0', borderRadius: 100, border: 'none', background: D.accent, color: '#fff', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'Geist, system-ui, sans-serif', marginTop: 4, opacity: loading ? .7 : 1 }}>
          {loading ? 'Verificando...' : 'Ingresar'}
        </button>
        {loginError && <div style={{ fontSize: 12, color: D.red, textAlign: 'center', marginTop: 10 }}>{loginError}</div>}
        <div style={{ fontSize: 11, color: D.text3, textAlign: 'center', marginTop: 28 }}>Congregación Ypacaraí</div>
      </div>
    </div>
  );

  return (
    <div style={css.body}>
      <div style={css.shell}>

        {/* TOPBAR */}
        <div style={{ ...css.topbar, flexDirection: 'column', alignItems: 'stretch', padding: '16px 22px 0', gap: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 600, color: D.text, letterSpacing: '-.3px', lineHeight: 1.15 }}>Arreglos de Conferencias</div>
              <div style={{ fontSize: 12, color: D.text3, letterSpacing: '.03em', marginTop: 3 }}>Ypacaraí · {role === 'admin' ? 'Administrador' : 'Colaborador'}</div>
            </div>
            <button onClick={doLogout} title="Salir"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: D.text3, padding: 4, marginTop: 2, display: 'flex', alignItems: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M15 4h4a1 1 0 011 1v12a1 1 0 01-1 1h-4" />
                <path d="M9 15l-5-4 5-4" />
                <path d="M4 11h10" />
              </svg>
            </button>
          </div>
          <div style={{ display: 'flex', gap: 0 }}>
            {['bosquejos', 'agenda', 'historial'].map(v => {
              const active = view === v;
              const labels = { bosquejos: 'Bosquejos', agenda: 'Agenda', historial: 'Historial' };
              const icons = {
                bosquejos: <path d="M4 5h12M4 10h12M4 15h7" />,
                agenda: <><rect x="3" y="4" width="14" height="13" rx="2" /><path d="M7 2v4M13 2v4M3 9h14" /></>,
                historial: <><circle cx="10" cy="10" r="7" /><path d="M10 6v4l3 2" /></>
              };
              return (
                <button key={v} onClick={() => { setView(v); setDetailMonth(null); }}
                  style={{ flex: 1, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '10px 0 13px', borderBottom: active ? `2px solid ${D.accent}` : '2px solid transparent' }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={active ? D.accent : D.text3} strokeWidth="1.4">{icons[v]}</svg>
                  <span style={{ fontSize: 12, fontWeight: active ? 500 : 400, color: active ? D.accent : D.text3, letterSpacing: '.02em' }}>{labels[v]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* VIEWS */}
        <div style={{ flex: 1, padding: '16px 20px 80px', overflowY: 'auto' }}>

          {/* BOSQUEJOS */}
          {view === 'bosquejos' && (
            <div>
              <div style={{ position: 'relative', marginBottom: 12 }}>
                <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: D.text3 }} width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="6.5" cy="6.5" r="4.5" /><path d="M10 10l3 3" /></svg>
                <input value={searchBQ} onChange={e => setSearchBQ(e.target.value)} placeholder="Buscar por número o título..."
                  style={{ ...css.input, paddingLeft: 36 }} />
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                {[['num', 'Numérico'], ['old', 'Sin asignar primero']].map(([m, lbl]) => (
                  <button key={m} onClick={() => setSortMode(m)}
                    style={{ fontSize: 11, padding: '5px 12px', borderRadius: 20, border: `1px solid ${sortMode === m ? D.accent : D.border2}`, background: sortMode === m ? D.accentDim : 'transparent', color: sortMode === m ? D.accent : D.text3, cursor: 'pointer', fontFamily: 'Geist, system-ui, sans-serif' }}>
                    {lbl}
                  </button>
                ))}
              </div>
              {bqList.length === 0 && <div style={{ textAlign: 'center', padding: '40px 0', color: D.text3, fontSize: 13 }}>Sin resultados</div>}
              {bqList.map(b => {
                const ld = lastDate(b.n); const rec = isRecent(b.n);
                return (
                  <div key={b.n} onClick={() => { setModalBQ({ num: b.n }); setForm({}); setSelMonthOpt(''); setSelSunday(''); }}
                    style={{ display: 'flex', alignItems: 'center', gap: 14, ...css.card, padding: '14px 16px', marginBottom: 8, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                    {rec && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: D.amber }} />}
                    {!ld && !rec && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: D.green }} />}
                    <div style={{ fontSize: 26, fontWeight: 300, color: D.text3, width: 48, textAlign: 'center', letterSpacing: '-.5px' }}>{b.n}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 16, fontWeight: 400, color: D.text, lineHeight: 1.4 }}>{b.t}</div>
                      <div style={{ fontSize: 13, fontWeight: 300, color: rec ? D.amber : D.text3, marginTop: 4 }}>
                        {rec ? `⚠ Presentado recientemente · ${fmtShort(ld)}` : ld ? `Último: ${fmtShort(ld)}` : 'Nunca presentado'}
                      </div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={D.text3} strokeWidth="1.2"><path d="M5 2l4 5-4 5" /></svg>
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
                    style={{ flex: 1, padding: '9px 0', borderRadius: 10, border: `1px solid ${curYear === y ? D.accent : D.border}`, background: curYear === y ? D.accentDim : 'transparent', fontSize: 13, fontWeight: curYear === y ? 500 : 400, color: curYear === y ? D.accent : D.text3, cursor: 'pointer', fontFamily: 'Geist, system-ui, sans-serif' }}>
                    {y}
                  </button>
                ))}
              </div>
              {MONTHS.map((mn, m) => {
                if (curYear === 2026 && m < 6) return null;
                const sundays = getSundaysOfMonth(curYear, m);
                const filled = sundays.filter(s => assignments[dateStr(s)]).length;
                const cls = filled === sundays.length ? 'complete' : filled > 0 ? 'partial' : 'empty';
                const bgMap = { complete: D.greenDim, partial: D.amberDim, empty: 'transparent' };
                const borderMap = { complete: `rgba(76,175,125,0.25)`, partial: `rgba(232,168,56,0.25)`, empty: D.border };
                const colorMap = { complete: D.green, partial: D.amber, empty: D.text3 };
                const txtMap = { complete: `Todos los domingos asignados — ${sundays.length}/${sundays.length}`, partial: `${filled} de ${sundays.length} domingos asignados`, empty: `Sin asignaciones — ${sundays.length} domingos` };
                return (
                  <div key={m} onClick={() => setDetailMonth(m)}
                    style={{ background: bgMap[cls], border: `1px solid ${borderMap[cls]}`, borderRadius: 14, padding: '16px 18px', marginBottom: 10, cursor: 'pointer' }}>
                    <div style={{ fontSize: 24, fontWeight: 300, color: D.text, letterSpacing: '-.5px', marginBottom: 4 }}>{mn}</div>
                    <div style={{ fontSize: 13, fontWeight: 400, color: colorMap[cls] }}>{txtMap[cls]}</div>
                    <div style={{ display: 'flex', gap: 5, marginTop: 10, flexWrap: 'wrap' }}>
                      {sundays.map(s => {
                        const a = assignments[dateStr(s)];
                        const c = a ? a.asamblea ? D.accent : D.green : D.bg4;
                        return <div key={dateStr(s)} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />;
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* MONTH DETAIL */}
          {view === 'agenda' && detailMonth !== null && (
            <div>
              <button onClick={() => setDetailMonth(null)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: D.text3, cursor: 'pointer', marginBottom: 16, background: 'none', border: 'none', fontFamily: 'Geist, system-ui, sans-serif', padding: 0 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M9 2L4 7l5 5" /></svg>
                {curYear}
              </button>
              <div style={{ fontSize: 32, fontWeight: 300, color: D.text, letterSpacing: -1, marginBottom: 4 }}>{MONTHS[detailMonth]}</div>
              <div style={{ fontSize: 14, color: D.text3, marginBottom: 18 }}>{curYear}</div>
              {getSundaysOfMonth(curYear, detailMonth).map(s => {
                const ds = dateStr(s); const a = assignments[ds];
                const lbl = s.toLocaleDateString('es-PY', { day: 'numeric', month: 'long' });
                const bgC = a ? a.asamblea ? D.accentDim : D.greenDim : 'transparent';
                const bdC = a ? a.asamblea ? `rgba(123,140,222,0.25)` : `rgba(76,175,125,0.25)` : D.border;
                return (
                  <div key={ds} onClick={() => { setModalSunday({ date: ds, assignment: a }); setSunBQNum(a?.bqNum || null); setForm({ asamblea: a?.asamblea || false, name: a?.name || '', cong: a?.cong || '', tel: a?.tel || '' }); }}
                    style={{ background: bgC, border: `1px solid ${bdC}`, borderRadius: 12, padding: '14px 16px', marginBottom: 8, cursor: 'pointer' }}>
                    <div style={{ fontSize: 16, fontWeight: 500, color: D.text, marginBottom: 4 }}>Domingo {lbl}</div>
                    {a?.asamblea && <div style={{ fontSize: 14, color: D.accent }}>🏛 Fin de semana de asamblea</div>}
                    {a?.bqNum && <><div style={{ fontSize: 14, color: D.text2 }}>{a.name || '—'} · {a.cong || '—'}{a.tel ? ' · ' + a.tel : ''}</div><div style={{ fontSize: 13, color: D.text3, marginTop: 3 }}>{a.bqNum} — {ALL_B[a.bqNum] || ''}</div></>}
                    {!a && <div style={{ fontSize: 12, color: D.text3, fontStyle: 'italic' }}>Sin asignar</div>}
                  </div>
                );
              })}
            </div>
          )}

          {/* HISTORIAL */}
          {view === 'historial' && (
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                <Chip active={!histYear} onClick={() => { setHistYear(null); setHistMonth(null); }}>Todo</Chip>
                {histYears.map(y => <Chip key={y} active={histYear === y} onClick={() => { setHistYear(y); setHistMonth(null); }}>{y}</Chip>)}
                {histYear && histMonths.map(m => <Chip key={m} active={histMonth === m} onClick={() => setHistMonth(m)}>{MONTHS[m]}</Chip>)}
              </div>
              {histEntries.length === 0 && <div style={{ textAlign: 'center', padding: '40px 0', color: D.text3, fontSize: 13 }}>Sin registros</div>}
              {histEntries.map(([ds, a]) => (
                <div key={ds} style={{ ...css.card, padding: '14px 16px', marginBottom: 8 }}>
                  <div style={{ fontSize: 13, color: D.text3, marginBottom: 5 }}>{fmtDate(ds)}</div>
                  <div><span style={{ fontSize: 13, fontWeight: 500, color: D.accent, marginRight: 6 }}>{a.bqNum}</span><span style={{ fontSize: 13, color: D.text }}>{ALL_B[a.bqNum] || ''}</span></div>
                  <div style={{ fontSize: 11, color: D.text2, marginTop: 3 }}>{[a.name, a.cong, a.tel].filter(Boolean).join(' · ')}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SAVE BANNER */}
        {pending && (
          <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 400, background: D.bg3, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 50, borderTop: `1px solid ${D.border2}` }}>
            <div style={{ fontSize: 14, color: D.text2 }}>¿Deseás confirmar y guardar?</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={discardChanges} style={{ fontSize: 11, fontWeight: 500, padding: '6px 14px', borderRadius: 20, border: `1px solid ${D.border2}`, background: 'transparent', color: D.text3, cursor: 'pointer', fontFamily: 'Geist, system-ui, sans-serif' }}>Descartar</button>
              <button onClick={saveToSheet} disabled={saving} style={{ fontSize: 11, fontWeight: 500, padding: '6px 14px', borderRadius: 20, border: 'none', background: D.accent, color: '#fff', cursor: 'pointer', fontFamily: 'Geist, system-ui, sans-serif' }}>{saving ? 'Guardando...' : 'Guardar'}</button>
            </div>
          </div>
        )}

        {/* MODAL: BQ — con selector de mes y domingos */}
        {modalBQ && (
          <Overlay onClose={() => setModalBQ(null)}>
            <div style={{ fontSize: 17, fontWeight: 500, color: D.text, marginBottom: 4 }}>Bosquejo {modalBQ.num}</div>
            <div style={{ fontSize: 11, color: D.text2, marginBottom: 18, lineHeight: 1.4 }}>{ALL_B[modalBQ.num]}</div>
            {isRecent(modalBQ.num) && (
              <div style={{ background: D.amberDim, border: `1px solid rgba(232,168,56,0.3)`, borderRadius: 8, padding: "13px 14px", marginBottom: 14, fontSize: 12, color: D.amber }}>
                ⚠ Presentado en los últimos 6 meses ({fmtShort(lastDate(modalBQ.num))})
              </div>
            )}
            <AsambleaCheck checked={form.asamblea} onChange={v => setForm(f => ({ ...f, asamblea: v }))} />
            {!form.asamblea && (
              <>
                <div style={{ marginBottom: 13 }}>
                  <div style={css.label}>Mes</div>
                  <select value={selMonthOpt} onChange={e => { setSelMonthOpt(e.target.value); setSelSunday(''); }}
                    style={{ ...css.input, ...(selMonthOpt ? css.inputFilled : {}), cursor: 'pointer', appearance: 'none' }}>
                    <option value="">Seleccionar mes...</option>
                    {MONTH_OPTIONS.map(o => <option key={`${o.year}-${o.month}`} value={`${o.year}-${o.month}`}>{o.label}</option>)}
                  </select>
                </div>
                {selMonthOpt && (
                  <div style={{ marginBottom: 13 }}>
                    <div style={css.label}>Domingo</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {sundaysForSel.map(s => {
                        const ds = dateStr(s);
                        const taken = assignments[ds];
                        const isSel = selSunday === ds;
                        return (
                          <div key={ds} onClick={() => !taken && setSelSunday(ds)}
                            style={{ padding: '10px 14px', borderRadius: 8, border: `1px solid ${isSel ? D.accent : taken ? D.border : D.border2}`, background: isSel ? D.accentDim : taken ? D.bg3 : 'transparent', cursor: taken ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 13, color: taken ? D.text3 : isSel ? D.accent : D.text }}>
                              {s.toLocaleDateString('es-PY', { weekday: 'long', day: 'numeric', month: 'long' })}
                            </span>
                            {taken && <span style={{ fontSize: 10, color: D.text3, background: D.bg4, padding: '2px 8px', borderRadius: 10 }}>Ocupado</span>}
                            {isSel && <span style={{ fontSize: 10, color: D.accent }}>✓</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                <FField label="Conferenciante" placeholder="Nombre y apellido" value={form.name || ''} onChange={v => setForm(f => ({ ...f, name: v }))} />
                <FField label="Congregación" placeholder="De dónde proviene" value={form.cong || ''} onChange={v => setForm(f => ({ ...f, cong: v }))} />
                <FField label="Teléfono" placeholder="09xx xxx xxx" value={form.tel || ''} onChange={v => setForm(f => ({ ...f, tel: v }))} />
              </>
            )}
            {form.asamblea && (
              <>
                <div style={{ marginBottom: 13 }}>
                  <div style={css.label}>Mes</div>
                  <select value={selMonthOpt} onChange={e => { setSelMonthOpt(e.target.value); setSelSunday(''); }}
                    style={{ ...css.input, ...(selMonthOpt ? css.inputFilled : {}), cursor: 'pointer', appearance: 'none' }}>
                    <option value="">Seleccionar mes...</option>
                    {MONTH_OPTIONS.map(o => <option key={`${o.year}-${o.month}`} value={`${o.year}-${o.month}`}>{o.label}</option>)}
                  </select>
                </div>
                {selMonthOpt && (
                  <div style={{ marginBottom: 13 }}>
                    <div style={css.label}>Domingo de asamblea</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {sundaysForSel.map(s => {
                        const ds = dateStr(s); const isSel = selSunday === ds;
                        return (
                          <div key={ds} onClick={() => setSelSunday(ds)}
                            style={{ padding: '10px 14px', borderRadius: 8, border: `1px solid ${isSel ? D.accent : D.border2}`, background: isSel ? D.accentDim : 'transparent', cursor: 'pointer' }}>
                            <span style={{ fontSize: 13, color: isSel ? D.accent : D.text }}>{s.toLocaleDateString('es-PY', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
            <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
              <Btn onClick={() => setModalBQ(null)} secondary>Cancelar</Btn>
              <Btn onClick={saveBQModal}>Confirmar</Btn>
            </div>
          </Overlay>
        )}

        {/* MODAL: SUNDAY */}
        {modalSunday && !modalBQSel && (
          <Overlay onClose={() => setModalSunday(null)}>
            <div style={{ fontSize: 17, fontWeight: 500, color: D.text, marginBottom: 18 }}>{fmtDate(modalSunday.date)}</div>
            <AsambleaCheck checked={form.asamblea} onChange={v => setForm(f => ({ ...f, asamblea: v }))} />
            {!form.asamblea && (
              <>
                <div style={{ marginBottom: 13 }}>
                  <div style={css.label}>Bosquejo</div>
                  <div onClick={() => { setModalBQSel(true); setBqSelSearch(''); }}
                    style={{ ...css.input, color: sunBQNum ? D.accent : D.text3, background: sunBQNum ? D.accentDim2 : D.bg3, borderColor: sunBQNum ? `rgba(123,140,222,0.3)` : D.border2, cursor: 'pointer' }}>
                    {sunBQNum ? `${sunBQNum} — ${ALL_B[sunBQNum]}` : 'Seleccionar bosquejo →'}
                  </div>
                </div>
                <FField label="Conferenciante" placeholder="Nombre y apellido" value={form.name || ''} onChange={v => setForm(f => ({ ...f, name: v }))} />
                <FField label="Congregación" placeholder="De dónde proviene" value={form.cong || ''} onChange={v => setForm(f => ({ ...f, cong: v }))} />
                <FField label="Teléfono" placeholder="09xx xxx xxx" value={form.tel || ''} onChange={v => setForm(f => ({ ...f, tel: v }))} />
              </>
            )}
            <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
              <Btn onClick={() => { setModalSunday(null); setSunBQNum(null); }} secondary>Cancelar</Btn>
              {modalSunday.assignment && <Btn onClick={deleteSunday} danger>Borrar</Btn>}
              <Btn onClick={saveSundayModal}>Guardar</Btn>
            </div>
          </Overlay>
        )}

        {/* MODAL: BQ SELECTOR */}
        {modalBQSel && (
          <Overlay onClose={() => setModalBQSel(false)} tall>
            <div style={{ fontSize: 14, fontWeight: 500, color: D.text, marginBottom: 12 }}>Elegir bosquejo</div>
            <div style={{ position: 'relative', marginBottom: 10 }}>
              <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: D.text3 }} width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="6.5" cy="6.5" r="4.5" /><path d="M10 10l3 3" /></svg>
              <input value={bqSelSearch} onChange={e => setBqSelSearch(e.target.value)} placeholder="Número o título..."
                style={{ ...css.input, paddingLeft: 36 }} />
            </div>
            <div style={{ overflowY: 'auto', flex: 1 }}>
              {(() => {
                const q = bqSelSearch.trim();
                const numQ = parseInt(q);
                const isExcluded = numQ && EXCL.has(numQ);
                if (isExcluded) return (
                  <div style={{ background: 'rgba(224,92,92,0.1)', border: '1px solid rgba(224,92,92,0.25)', borderRadius: 10, padding: '14px 16px', margin: '8px 0' }}>
                    <div style={{ fontSize: 15, fontWeight: 500, color: '#E05C5C', marginBottom: 6 }}>Bosquejo {numQ} no disponible</div>
                    <div style={{ fontSize: 13, color: '#9A9AA8', lineHeight: 1.5 }}>Este bosquejo ya no está disponible desde Septiembre 2026. Por favor seleccioná otro.</div>
                  </div>
                );
                const filtered = BOSQUEJOS.filter(b => !q || b.n.toString().includes(q) || b.t.toLowerCase().includes(q.toLowerCase()));
                if (filtered.length === 0 && q) return (
                  <div style={{ padding: '20px 0', textAlign: 'center', color: '#5A5A68', fontSize: 13 }}>Sin resultados</div>
                );
                return filtered.map(b => {
                  const rec = isRecent(b.n);
                  return (
                    <div key={b.n} onClick={() => { setSunBQNum(b.n); setModalBQSel(false); }}
                      style={{ display: 'flex', gap: 12, padding: '10px 4px', borderBottom: `1px solid ${D.border}`, cursor: 'pointer', borderLeft: rec ? `3px solid ${D.amber}` : 'none', paddingLeft: rec ? 8 : 4 }}>
                      <div style={{ fontSize: 18, fontWeight: 300, color: D.text3, width: 34, flexShrink: 0 }}>{b.n}</div>
                      <div>
                        <div style={{ fontSize: 15, color: D.text, lineHeight: 1.3 }}>{b.t}</div>
                        {rec && <div style={{ fontSize: 12, color: D.amber, marginTop: 2 }}>⚠ Presentado recientemente</div>}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
            <button onClick={() => setModalBQSel(false)}
              style={{ marginTop: 12, width: '100%', padding: '11px 0', borderRadius: 100, border: `1px solid ${D.border2}`, background: 'transparent', color: D.text3, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'Geist, system-ui, sans-serif' }}>Cancelar</button>
          </Overlay>
        )}
      </div>
    </div>
  );
}

function Overlay({ children, onClose, tall }) {
  return (
    <div onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div style={{ background: '#1C1C1F', borderRadius: '18px 18px 0 0', padding: '24px 20px 36px', width: '100%', maxWidth: 400, maxHeight: tall ? '88vh' : '90vh', display: tall ? 'flex' : 'block', flexDirection: tall ? 'column' : undefined, overflowY: tall ? undefined : 'auto', border: '1px solid rgba(255,255,255,0.1)', borderBottom: 'none' }}>
        {children}
      </div>
    </div>
  );
}

function AsambleaCheck({ checked, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', background: 'rgba(123,140,222,0.08)', border: '1px solid rgba(123,140,222,0.2)', borderRadius: 10, cursor: 'pointer', marginBottom: 16 }}>
      <input type="checkbox" checked={checked || false} onChange={e => onChange(e.target.checked)} style={{ width: 16, height: 16, accentColor: '#7B8CDE' }} onClick={e => e.stopPropagation()} />
      <span style={{ fontSize: 13, fontWeight: 400, color: '#7B8CDE' }}>Fin de semana de asamblea</span>
    </label>
  );
}

function FField({ label, placeholder, value, onChange, type = 'text' }) {
  const D2 = { text3: '#5A5A68', accent: '#7B8CDE', text: '#E8E8EC' };
  return (
    <div style={{ marginBottom: 13 }}>
      <div style={{ fontSize: 10, fontWeight: 500, color: D2.text3, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: '100%', background: value ? 'rgba(123,140,222,0.08)' : '#242428', border: `1px solid ${value ? 'rgba(123,140,222,0.3)' : 'rgba(255,255,255,0.12)'}`, borderRadius: 8, padding: "13px 14px", fontSize: 14, fontWeight: 300, color: value ? D2.accent : D2.text, fontFamily: 'Geist, system-ui, sans-serif', outline: 'none' }} />
    </div>
  );
}

function Btn({ children, onClick, secondary, danger }) {
  return (
    <button onClick={onClick}
      style={{ flex: danger ? 'none' : 1, padding: danger ? '11px 16px' : '11px 0', borderRadius: 100, border: 'none', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'Geist, system-ui, sans-serif', background: danger ? 'rgba(224,92,92,0.15)' : secondary ? 'rgba(255,255,255,0.06)' : '#7B8CDE', color: danger ? '#E05C5C' : secondary ? '#9A9AA8' : '#fff' }}>
      {children}
    </button>
  );
}

function Chip({ children, active, onClick }) {
  return (
    <button onClick={onClick}
      style={{ fontSize: 11, padding: '5px 12px', borderRadius: 20, border: `1px solid ${active ? '#7B8CDE' : 'rgba(255,255,255,0.1)'}`, background: active ? 'rgba(123,140,222,0.15)' : 'transparent', color: active ? '#7B8CDE' : '#5A5A68', cursor: 'pointer', fontFamily: 'Geist, system-ui, sans-serif' }}>
      {children}
    </button>
  );
}