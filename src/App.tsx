/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Activity, 
  Clock, 
  Stethoscope, 
  UserPlus, 
  LayoutDashboard, 
  Bell, 
  Search,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Menu,
  X,
  Plus,
  Emergency,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type View = 'landing' | 'patient' | 'doctor' | 'nurse' | 'emergency' | 'login';
type AuthRole = 'patient' | 'professional' | null;

interface User {
  name: string;
  role: AuthRole;
}

// --- Mock Data ---
const QUEUE_PATIENTS = [
  { id: 'PT-901', name: 'Jean Dupont', wait: '12m', status: 'En cours', priority: 'Moyenne' },
  { id: 'PT-882', name: 'Marc Lefebvre', wait: '28m', status: 'Suivant', priority: 'Basse' },
  { id: 'PT-912', name: 'Sarah Jenkins', wait: '5m', status: 'En attente', priority: 'Haute' },
];

const EMERGENCY_QUEUE = [
  { id: 'ER-101', name: 'Alain Kotto', time: '4m', triage: 'Niveau 1', mode: 'Ambulance', details: 'Détresse respiratoire' },
  { id: 'ER-105', name: 'Moussa Soso', time: '15m', triage: 'Niveau 2', mode: 'SAMU', details: 'Traumatisme cranien' },
  { id: 'ER-108', name: 'Inconnu X', time: '1m', triage: 'Niveau 1', mode: 'Particulier', details: 'Arrêt cardio-respiratoire' },
];

const VITALS = [
  { label: 'Tension', value: '120/80', icon: Activity, color: 'text-blue-500' },
  { label: 'Pouls', value: '72 BPM', icon: Activity, color: 'text-red-500' },
  { label: 'Temp.', value: '37.2 °C', icon: Activity, color: 'text-orange-500' },
  { label: 'Sat.', value: '98%', icon: Activity, color: 'text-sky-500' },
];

// --- Sub-components ---

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-hospital-blue-deep flex items-center justify-center text-white">
      <Activity size={20} />
    </div>
    <span className="text-xl font-extrabold tracking-tight text-midnight">SmartFlow</span>
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-2xl organic-shadow border border-slate-100 ${className}`}>
    {children}
  </div>
);

// --- Pages ---

const LandingPage = ({ onNavigate }: { onNavigate: (v: View) => void }) => (
  <div className="space-y-xl">
    <section className="relative min-h-[80vh] flex items-center justify-center pt-20 px-6">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-hospital-blue-light rounded-full blur-[120px] opacity-60 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-hospital-blue rounded-full blur-[100px] opacity-20 -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-4xl text-center space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1.5 rounded-full bg-hospital-blue-light text-hospital-blue-deep font-semibold text-sm border border-hospital-blue/20"
        >
          L'humanité au cœur de l'urgence
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold text-midnight leading-tight"
        >
          Gérer les flux pour <br />
          <span className="text-hospital-blue-deep italic font-display">sauver des vies.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
        >
          SmartFlow est la plateforme intelligente qui transforme l'attente en parcours fluide. 
          Une solution simple, robuste et résolument humaine.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button 
            onClick={() => onNavigate('doctor')}
            className="px-8 py-4 bg-midnight text-white rounded-full font-bold hover:bg-midnight-light transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
          >
            Accès Professionnel <ArrowRight size={20} />
          </button>
          <button 
            onClick={() => onNavigate('patient')}
            className="px-8 py-4 bg-white text-midnight border border-slate-200 rounded-full font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            Espace Patient <ChevronRight size={20} />
          </button>
        </motion.div>
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 pb-Margin">
      {[
        { title: 'Fluidité', desc: 'Réduisez le temps d\'attente de 40% grâce au triage intelligent.', icon: Activity },
        { title: 'Priorisation', desc: 'Les cas critiques sont détectés et orientés instantanément.', icon: ShieldCheck },
        { title: 'Simplicité', desc: 'Une interface pensée pour tous : patients et soignants.', icon: Stethoscope },
      ].map((feat, i) => (
        <Card key={i} className="p-8 group hover:-translate-y-1 transition-all">
          <div className="w-12 h-12 rounded-xl bg-hospital-blue-light text-hospital-blue-deep flex items-center justify-center mb-6 transition-colors group-hover:bg-hospital-blue group-hover:text-white">
            <feat.icon size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-midnight">{feat.title}</h3>
          <p className="text-slate-500 leading-relaxed">{feat.desc}</p>
        </Card>
      ))}
    </section>
  </div>
);

const DoctorWorkspace = () => (
  <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
      <div className="space-y-1">
        <h2 className="text-3xl font-extrabold text-midnight">Espace de Travail</h2>
        <p className="text-slate-500">Dr. Sarah Memmi • Cardiologie</p>
      </div>
      <div className="flex gap-4">
        {[
          { label: 'Attente moyenne', val: '14 min', color: 'text-hospital-blue-deep' },
          { label: 'En attente', val: '8 Patients', color: 'text-midnight' },
        ].map((s, i) => (
          <Card key={i} className="p-4 flex items-center gap-4 min-w-[200px]">
            <div className="w-10 h-10 rounded-full bg-hospital-blue-light flex items-center justify-center">
              <Clock size={20} className="text-hospital-blue-deep" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
              <p className={`text-xl font-bold ${s.color}`}>{s.val}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-12 gap-8">
      {/* File d'attente */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        <Card className="flex flex-col h-[600px]">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50 rounded-t-2xl">
            <h3 className="font-bold text-midnight flex items-center gap-2">
              <LayoutDashboard size={20} className="text-hospital-blue-deep" /> File d'attente
            </h3>
            <span className="px-3 py-1 bg-hospital-blue-light text-hospital-blue-deep rounded-full text-xs font-bold">
              8 Actifs
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {QUEUE_PATIENTS.map((p, i) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${i === 0 ? 'bg-hospital-blue-light border-hospital-blue/30' : 'bg-white border-slate-50 hover:border-hospital-blue-light'}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-midnight">{p.name}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${p.priority === 'Haute' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                    {p.priority}
                  </span>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1 italic">
                  <Clock size={12} /> Attente: {p.wait}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="p-4">
            <button className="w-full py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-hospital-blue-light hover:text-hospital-blue-deep transition-all">
              Gérer la file complète
            </button>
          </div>
        </Card>
      </div>

      {/* Patient Actif */}
      <div className="col-span-12 lg:col-span-8 space-y-6">
        <Card className="p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-hospital-blue-light opacity-30 rounded-bl-full pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="w-32 h-32 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-300 overflow-hidden">
               <UserPlus size={48} />
            </div>
            <div className="flex-1 w-full text-center md:text-left space-y-4">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <h2 className="text-3xl font-extrabold text-midnight">Sarah Jenkins</h2>
                <span className="px-3 py-1 bg-midnight text-white rounded-full text-xs font-bold">Femme, 48 ans</span>
              </div>
              <p className="text-slate-500 leading-relaxed italic">
                "Patient se plaint d'une gêne thoracique sourde irradiant vers le bras gauche depuis 2 heures. Antécédents d'hypertension."
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                {VITALS.map((v, i) => (
                  <div key={i} className="bg-hospital-blue-light/50 border border-hospital-blue/10 rounded-xl p-4 min-w-[120px]">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{v.label}</p>
                    <p className={`text-lg font-bold ${v.color}`}>{v.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-4">
                <h4 className="font-bold text-midnight flex items-center gap-2">
                  <Activity size={18} className="text-hospital-blue-deep" /> Notes Médicales
                </h4>
                <textarea 
                  className="w-full h-40 bg-slate-50 border-none rounded-2xl p-4 text-slate-700 font-medium placeholder:text-slate-300 focus:ring-2 focus:ring-hospital-blue/30 outline-none resize-none"
                  placeholder="Saisir vos observations cliniques ici..."
                />
             </div>
             <div className="space-y-4">
                <h4 className="font-bold text-midnight flex items-center gap-2">
                  <Clock size={18} className="text-hospital-blue-deep" /> Actions Rapides
                </h4>
                <div className="grid grid-cols-1 gap-2">
                   {['Prescription ECG', 'Bilan Sanguin', 'Admission Urgences'].map((act, i) => (
                     <button key={i} className="w-full py-3 px-4 bg-white border border-slate-100 rounded-xl text-left text-sm font-semibold hover:bg-hospital-blue-light hover:text-hospital-blue-deep hover:border-hospital-blue/20 transition-all flex justify-between items-center group">
                        {act} <ChevronRight size={16} className="text-slate-200 group-hover:translate-x-1 transition-transform" />
                     </button>
                   ))}
                </div>
                <button className="w-full py-4 bg-hospital-blue-deep text-white rounded-2xl font-bold hover:bg-midnight transition-colors shadow-lg shadow-hospital-blue/20 active:scale-95">
                  Valider le dossier
                </button>
             </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
);

const NurseWorkspace = () => (
  <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row justify-between items-center gap-6"
    >
      <div className="text-center md:text-left space-y-2">
        <h2 className="text-4xl font-extrabold text-midnight">Admission Patients</h2>
        <p className="text-slate-500 font-medium flex items-center justify-center md:justify-start gap-2">
           <ShieldCheck size={18} className="text-hospital-blue-deep" />
           Poste de Santé Autorisé • Session Sécurisée
        </p>
      </div>
      <div className="px-6 py-3 bg-hospital-blue-light rounded-2xl border border-hospital-blue/20">
        <p className="text-[10px] font-black text-hospital-blue-deep uppercase tracking-widest text-center">Statut du Flux</p>
        <p className="text-lg font-bold text-midnight text-center">Flux Optimal</p>
      </div>
    </motion.header>

    <div className="grid grid-cols-1 gap-8">
      <Card className="p-10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-40 h-40 bg-hospital-blue-light opacity-30 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
        
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-hospital-blue-deep text-white rounded-2xl flex items-center justify-center shadow-lg">
            <UserPlus size={24} />
          </div>
          <h3 className="text-2xl font-extrabold text-midnight">Nouvel Enregistrement</h3>
        </div>

        <form className="space-y-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Identité du Patient</label>
              <input 
                className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-3xl focus:border-hospital-blue/40 focus:bg-white transition-all outline-none font-medium" 
                placeholder="Nom complet du patient" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Âge</label>
                <input 
                  type="number"
                  className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-3xl focus:border-hospital-blue/40 focus:bg-white transition-all outline-none font-medium" 
                  placeholder="Âge" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Sexe</label>
                <select className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-3xl focus:border-hospital-blue/40 focus:bg-white transition-all outline-none font-medium appearance-none">
                  <option>Masculin</option>
                  <option>Féminin</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Motif & Observations Préliminaires</label>
            <textarea 
              rows={3}
              className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-3xl focus:border-hospital-blue/40 focus:bg-white transition-all outline-none font-medium resize-none" 
              placeholder="Décrivez brièvement les symptômes ou le motif de visite..."
            />
          </div>

          <div className="bg-hospital-blue-light/20 p-8 rounded-[2.5rem] border border-hospital-blue/10 space-y-6">
            <div className="flex items-center gap-2 text-hospital-blue-deep">
              <Activity size={20} />
              <h4 className="font-bold">Priorisation (Triage)</h4>
            </div>
            <div className="flex flex-wrap gap-4">
              {[
                { id: 'normal', label: 'Normal', color: 'bg-white text-slate-600' },
                { id: 'urgent', label: 'Urgent', color: 'bg-orange-100 text-orange-600 border-orange-200' },
                { id: 'critique', label: 'CRITIQUE', color: 'bg-red-100 text-red-600 border-red-200' },
              ].map((t) => (
                <button 
                  key={t.id}
                  type="button"
                  className={`px-6 py-3 rounded-2xl text-sm font-black border transition-all active:scale-95 ${t.color}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-4">
            <p className="text-sm text-slate-400 font-medium italic">
              L'enregistrement génère automatiquement un ticket numérique envoyé par SMS.
            </p>
            <div className="flex gap-4 w-full sm:w-auto">
              <button 
                type="reset" 
                className="flex-1 sm:flex-none px-8 py-4 text-slate-400 font-bold hover:text-midnight transition-colors"
              >
                Annuler
              </button>
              <button 
                type="button" 
                className="flex-1 sm:flex-none px-10 py-4 bg-hospital-blue-deep text-white rounded-full font-black shadow-xl shadow-hospital-blue/20 hover:bg-midnight transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Confirmer l'Admission <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </form>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6 bg-slate-900 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Bell size={20} className="text-hospital-blue" />
            <h4 className="font-bold">Alerte Disponibilité</h4>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Le service de cardiologie est actuellement à pleine capacité. Veuillez orienter les admissions stables vers la zone d'attente B.
          </p>
        </Card>
        <Card className="p-6 flex items-center justify-between group cursor-pointer hover:border-hospital-blue/30 transition-all">
          <div className="space-y-1">
            <h4 className="font-bold text-midnight">Imprimer Ticket Physique</h4>
            <p className="text-xs text-slate-400">Pour les patients sans smartphone</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-hospital-blue-light group-hover:text-hospital-blue-deep transition-all">
            <Plus size={20} />
          </div>
        </Card>
      </div>
    </div>
  </div>
);

const PatientWorkspace = () => (
  <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
    <header className="text-center space-y-4">
      <div className="w-20 h-20 bg-hospital-blue-light rounded-[2.5rem] flex items-center justify-center text-hospital-blue-deep mx-auto shadow-inner">
        <Clock size={40} />
      </div>
      <h2 className="text-4xl font-extrabold text-midnight">Votre Parcours de Soins</h2>
      <p className="text-slate-500 font-medium">Bienvenue, Jean Dupont. Vous êtes entre de bonnes mains.</p>
    </header>

    {/* Statut de la file */}
    <Card className="p-8 relative overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-32 h-32 bg-hospital-blue-light opacity-50 rounded-bl-full pointer-events-none" />
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left space-y-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Votre position actuelle</p>
          <div className="flex items-center gap-4">
             <span className="text-6xl font-black text-hospital-blue-deep">02</span>
             <div>
               <p className="text-xl font-bold text-midnight">Dans la file</p>
               <p className="text-slate-400">Évaluation cardiologie</p>
             </div>
          </div>
        </div>
        
        <div className="h-20 w-px bg-slate-100 hidden md:block" />

        <div className="text-center md:text-left space-y-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Temps estimé</p>
          <div className="flex items-center gap-4">
             <span className="text-3xl font-extrabold text-midnight">~ 14 min</span>
             <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-500">
               <Activity size={24} />
             </div>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-2">
         <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ duration: 1.5 }}
              className="h-full bg-hospital-blue-deep"
            />
         </div>
         <p className="text-xs font-bold text-slate-300 text-right">Progression : 75% • Prochaine étape : Consultation</p>
      </div>
    </Card>

    {/* Suggestions bien-être */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="p-6 bg-hospital-blue-light/20 border-hospital-blue/10">
        <h4 className="font-bold text-midnight mb-4 flex items-center gap-2">
          <Stethoscope size={18} className="text-hospital-blue-deep" /> Pendant votre attente...
        </h4>
        <p className="text-sm text-slate-600 leading-relaxed">
          N'hésitez pas à vous hydrater. Si vous ressentez une modification de vos symptômes, signalez-le immédiatement à l'accueil.
        </p>
      </Card>
      <Card className="p-6 border-slate-50">
        <h4 className="font-bold text-midnight mb-4 flex items-center gap-2">
          <Bell size={18} className="text-hospital-blue-deep" /> Notifications SMS
        </h4>
        <p className="text-sm text-slate-600 leading-relaxed">
          Nous vous enverrons un SMS 5 minutes avant votre passage pour que vous puissiez vous préparer.
        </p>
      </Card>
    </div>
  </div>
);

const EmergencyWorkspace = () => (
  <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div className="flex gap-4 items-center">
        <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center text-white shadow-lg animate-pulse">
           <Bell size={28} />
        </div>
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold text-midnight">Portail Urgences</h2>
          <p className="text-slate-500 font-semibold flex items-center gap-2">
             <Activity size={16} className="text-red-500" /> Unité de Déchocage • Niveau 1
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <Card className="p-4 border-red-100 bg-red-50/30">
          <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1">Cas Critiques</p>
          <p className="text-3xl font-extrabold text-red-600">03</p>
        </Card>
        <Card className="p-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Temps de Réaction Moy.</p>
          <p className="text-3xl font-extrabold text-midnight">2m 45s</p>
        </Card>
      </div>
    </div>

    <div className="grid grid-cols-12 gap-8">
      {/* File Urgence */}
      <div className="col-span-12 lg:col-span-4">
        <Card className="flex flex-col h-[700px] border-red-50">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-red-50/50 rounded-t-2xl">
            <h3 className="font-bold text-midnight flex items-center gap-2">
              <LayoutDashboard size={20} className="text-red-600" /> Triage en Attente
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {EMERGENCY_QUEUE.map((p, i) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${p.triage === 'Niveau 1' ? 'bg-red-50 border-red-200' : 'bg-white border-slate-50 hover:bg-slate-50'}`}
              >
                {p.triage === 'Niveau 1' && (
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-red-600" />
                )}
                <div className="flex justify-between items-start mb-2">
                   <h4 className="font-bold text-midnight text-lg">{p.name}</h4>
                   <span className="text-[10px] font-bold px-2 py-1 bg-white rounded shadow-sm">
                      {p.time}
                   </span>
                </div>
                <p className="text-sm text-slate-600 mb-3 font-semibold">{p.details}</p>
                <div className="flex items-center gap-3">
                   <span className={`text-[10px] font-extrabold px-2 py-1 rounded uppercase ${p.triage === 'Niveau 1' ? 'bg-red-600 text-white' : 'bg-orange-100 text-orange-600'}`}>
                      {p.triage}
                   </span>
                   <span className="text-[10px] text-slate-400 font-bold uppercase">{p.mode}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="p-4 grid grid-cols-2 gap-3">
             <button className="py-4 bg-midnight text-white rounded-2xl font-bold text-sm shadow-lg active:scale-95">
                Nouvelle Admission
             </button>
             <button className="py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all">
                Historique ER
             </button>
          </div>
        </Card>
      </div>

      {/* Détails Cas Critique */}
      <div className="col-span-12 lg:col-span-8">
        <Card className="p-10 border-red-200 bg-white relative">
           <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="w-48 h-48 rounded-[2rem] bg-red-50 flex flex-col items-center justify-center text-red-600 border border-red-100 gap-2 shrink-0">
                 <Activity size={48} />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-red-400">Monitoring Actif</span>
              </div>
              <div className="flex-1 space-y-6">
                 <div className="flex justify-between items-center">
                    <h2 className="text-4xl font-extrabold text-midnight">Inconnu X</h2>
                    <span className="px-6 py-2 bg-red-600 text-white rounded-full font-bold animate-pulse">ALERTE CRITIQUE</span>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl">
                       <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Arrivée</p>
                       <p className="font-bold text-midnight">Particulier • Il y a 1m</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl">
                       <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Motif suspecté</p>
                       <p className="font-bold text-red-600">Arrêt cardio-respiratoire</p>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-4 gap-4">
                    {VITALS.map((v, i) => (
                      <div key={i} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                         <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">{v.label}</p>
                         <p className={`text-xl font-black ${i === 0 || i === 1 ? 'text-red-600' : 'text-midnight'}`}>
                            {i === 0 ? '70/40' : i === 1 ? '42' : v.value}
                         </p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="mt-12 flex flex-col gap-6">
              <div className="bg-midnight rounded-3xl p-8 text-white space-y-6">
                 <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                       <Settings size={22} className="text-hospital-blue" /> Protocoles Prioritaires
                    </h3>
                    <span className="text-xs bg-hospital-blue-deep/20 text-hospital-blue px-3 py-1 rounded-full border border-hospital-blue/30">IA-SIGHT Active</span>
                 </div>
                 <div className="grid grid-cols-3 gap-4">
                    {['Intubation immédiate', 'Adrénaline 1mg', 'Défibrillateur prêt'].map((p, i) => (
                       <button key={i} className="p-4 bg-white/10 rounded-2xl border border-white/10 text-sm font-bold hover:bg-white/20 transition-all text-center">
                          {p}
                       </button>
                    ))}
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                 <button className="py-5 bg-red-600 text-white rounded-3xl font-black text-xl shadow-xl hover:bg-red-700 transition-all uppercase tracking-widest active:scale-95">
                    Lancer l'intervention
                 </button>
                 <button className="py-5 bg-white border-2 border-slate-800 text-slate-800 rounded-3xl font-black text-xl hover:bg-slate-50 transition-all uppercase tracking-widest active:scale-95">
                    Appeler Médecin Chef
                 </button>
              </div>
           </div>
        </Card>
      </div>
    </div>
  </div>
);

const AuthView = ({ onLogin, initialRole }: { onNavigate: (v: View) => void, onLogin: (user: User) => void, initialRole: AuthRole }) => {
  const [role, setRole] = React.useState<AuthRole>(initialRole || 'patient');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ name: role === 'professional' ? 'Dr. Memmi' : 'Jean Dupont', role });
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="p-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-midnight">Connexion</h2>
          <p className="text-slate-400 text-sm">Accédez à votre espace sécurisé SmartFlow</p>
        </div>

        <div className="flex p-1 bg-slate-50 rounded-2xl">
          <button 
            onClick={() => setRole('patient')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${role === 'patient' ? 'bg-white text-hospital-blue-deep shadow-sm' : 'text-slate-400'}`}
          >
            Patient
          </button>
          <button 
            onClick={() => setRole('professional')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${role === 'professional' ? 'bg-midnight text-white shadow-sm' : 'text-slate-400'}`}
          >
            Professionnel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Adresse Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-hospital-blue/30 outline-none" 
                placeholder={role === 'professional' ? 'pro@demo.bj' : 'patient@demo.bj'} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Mot de passe</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-hospital-blue/30 outline-none" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          <button 
            type="submit"
            className={`w-full py-4 rounded-full font-extrabold text-lg shadow-lg active:scale-95 transition-all ${role === 'professional' ? 'bg-midnight text-white hover:bg-midnight-light shadow-midnight/20' : 'bg-hospital-blue-deep text-white hover:bg-hospital-blue-deep shadow-hospital-blue/20'}`}
          >
            Se Connecter
          </button>
        </form>

        <div className="pt-6 border-t border-slate-50 space-y-3">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest text-center">Identifiants de démonstration</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-slate-50 rounded-xl text-center">
              <p className="text-[10px] font-bold text-slate-400">Patient</p>
              <p className="text-[10px] font-bold text-midnight">patient@demo.bj</p>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl text-center">
              <p className="text-[10px] font-bold text-slate-400">Pro</p>
              <p className="text-[10px] font-bold text-midnight">pro@demo.bj</p>
            </div>
          </div>
          <p className="text-[10px] font-bold text-slate-400 text-center">Mot de passe : <span className="text-hospital-blue-deep">demo2026</span></p>
        </div>
      </Card>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentView, setCurrentView] = React.useState<View>('landing');
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [pendingRole, setPendingRole] = React.useState<AuthRole>(null);

  const navigation = [
    { id: 'landing', label: 'Accueil', icon: Activity },
    { id: 'nurse', label: 'Admission', icon: UserPlus },
    { id: 'doctor', label: 'Consultation', icon: Stethoscope },
    { id: 'patient', label: 'Espace Patient', icon: Clock },
    { id: 'emergency', label: 'Urgence', icon: Bell },
  ];

  const handleNavigate = (view: View) => {
    if (view !== 'landing' && view !== 'login' && !user) {
      setPendingRole(view === 'patient' ? 'patient' : 'professional');
      setCurrentView('login');
    } else {
      setCurrentView(view);
    }
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    if (newUser.role === 'professional') {
      setCurrentView('doctor');
    } else {
      setCurrentView('patient');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-card h-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
          <button onClick={() => handleNavigate('landing')} className="active:scale-95 transition-transform">
            <Logo />
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id as View)}
                className={`text-sm font-bold tracking-tight transition-all relative py-2 ${currentView === item.id ? 'text-hospital-blue-deep' : 'text-slate-400 hover:text-midnight'}`}
              >
                {item.label}
                {currentView === item.id && (
                  <motion.div layoutId="nav-line" className="absolute bottom-0 left-0 right-0 h-0.5 bg-hospital-blue-deep rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-bold text-midnight leading-none">{user.name}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">{user.role}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { setPendingRole(null); setCurrentView('login'); }}
                className="hidden sm:flex px-6 py-2.5 bg-hospital-blue-light text-hospital-blue-deep rounded-full font-bold text-sm tracking-tight border border-hospital-blue/10 hover:bg-hospital-blue hover:text-white transition-all active:scale-95"
              >
                Connexion
              </button>
            )}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-midnight hover:bg-slate-50 rounded-lg"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 pt-20 bg-white lg:hidden"
          >
            <div className="p-6 space-y-4">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id as View)}
                  className="w-full p-4 rounded-2xl flex items-center gap-4 bg-slate-50 text-midnight font-bold"
                >
                  <div className="w-10 h-10 rounded-xl bg-hospital-blue-light flex items-center justify-center text-hospital-blue-deep">
                    <item.icon size={20} />
                  </div>
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentView === 'landing' && <LandingPage onNavigate={handleNavigate} />}
            {currentView === 'login' && <AuthView onLogin={handleLogin} initialRole={pendingRole} onNavigate={handleNavigate} />}
            {currentView === 'doctor' && user?.role === 'professional' && <DoctorWorkspace />}
            {currentView === 'emergency' && user?.role === 'professional' && <EmergencyWorkspace />}
            {currentView === 'nurse' && user?.role === 'professional' && <NurseWorkspace />}
            {currentView === 'patient' && user?.role === 'patient' && <PatientWorkspace />}
            
            {user && (currentView === 'doctor' || currentView === 'emergency' || currentView === 'nurse') && user.role !== 'professional' && (
              <div className="text-center py-20">
                <p>Accès réservé aux professionnels.</p>
                <button onClick={() => setCurrentView('landing')} className="text-hospital-blue-deep font-bold">Retour</button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-midnight text-white py-16 px-6 mt-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-hospital-blue-deep flex items-center justify-center text-white">
                <Activity size={20} />
              </div>
              <span className="text-xl font-extrabold">SmartFlow</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              La solution nationale pour une gestion intelligente et humaine des files d'attente.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-hospital-blue">Solutions</h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">Hôpitaux</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Banques</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Administrations</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-hospital-blue">Ressources</h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-hospital-blue">Contact</h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-center gap-2 italic">SmartFlow Bénin 2026</li>
              <li className="font-semibold text-hospital-blue">contact@smartflow.bj</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500 font-bold uppercase tracking-widest">
           <span>© 2026 SmartFlow. Tous droits réservés.</span>
           <div className="flex gap-6">
             <span>Humanité</span>
             <span>Intégrité</span>
             <span>Efficacité</span>
           </div>
        </div>
      </footer>
    </div>
  );
}
