'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import jsPDF from 'jspdf';
import emailjs from '@emailjs/browser';

export default function Home() {
  const [theme, setTheme] = useState('Emploi');
  const [data, setData] = useState('');
  const [email, setEmail] = useState('');

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Veille médiatique – Thème : ${theme}\n\n${data}`, 10, 10);
    doc.save(`veille_${theme.toLowerCase()}.pdf`);
  };

  const sendEmail = () => {
    emailjs.send(
      'your_service_id',
      'your_template_id',
      {
        message: data,
        subject: `Veille médiatique – ${theme}`,
        to_email: email,
      },
      'your_user_id'
    ).then(() => alert('Email envoyé')).catch(err => alert('Erreur : ' + err.text));
  };

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Veille médiatique – {theme}</h1>

      <Textarea
        placeholder="Entrez ici votre contenu de veille (ex : actualités emploi, sources, extraits presse...)"
        value={data}
        onChange={e => setData(e.target.value)}
        className="mb-4 h-64 w-full"
      />

      <div className="flex flex-col sm:flex-row gap-2 mb-4 w-full">
        <Button className="w-full sm:w-auto" onClick={generatePDF}>Exporter en PDF</Button>
        <input
          type="email"
          placeholder="Email du destinataire"
          className="border rounded px-2 py-1 w-full sm:w-auto"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Button className="w-full sm:w-auto" onClick={sendEmail}>Envoyer par e-mail</Button>
      </div>
    </main>
  );
}