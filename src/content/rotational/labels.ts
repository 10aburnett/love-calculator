import type { Locale } from '@/i18n/request';

// UI labels for the Daily Love Insight card, localized for every supported
// locale. Kept here (rather than in the big per-locale message JSON files) so
// the whole rotational feature lives in one place. English is the fallback.
export interface DailyLabels {
  heading: string;
  subheading: string;
  updatedDaily: string;
  insightOfTheDay: string;
  didYouKnow: string;
}

export const dailyLabels: Record<Locale, DailyLabels> = {
  en: {
    heading: 'Your Daily Love Insight',
    subheading:
      'A fresh dose of relationship wisdom, a fun love fact, and a timeless quote — refreshed every single day.',
    updatedDaily: 'Fresh every day',
    insightOfTheDay: 'Insight of the day',
    didYouKnow: 'Did you know?',
  },
  es: {
    heading: 'Tu dosis diaria de amor',
    subheading:
      'Una dosis fresca de sabiduría sobre relaciones, un dato curioso del amor y una cita atemporal, renovados cada día.',
    updatedDaily: 'Nuevo cada día',
    insightOfTheDay: 'Consejo del día',
    didYouKnow: '¿Sabías que...?',
  },
  fr: {
    heading: 'Votre inspiration amour du jour',
    subheading:
      "Une dose fraîche de sagesse amoureuse, un fait surprenant sur l'amour et une citation intemporelle, renouvelés chaque jour.",
    updatedDaily: 'Nouveau chaque jour',
    insightOfTheDay: 'Le conseil du jour',
    didYouKnow: 'Le saviez-vous ?',
  },
  de: {
    heading: 'Deine tägliche Liebes-Inspiration',
    subheading:
      'Eine frische Portion Beziehungsweisheit, ein spannender Liebes-Fakt und ein zeitloses Zitat – jeden Tag neu.',
    updatedDaily: 'Täglich neu',
    insightOfTheDay: 'Tipp des Tages',
    didYouKnow: 'Schon gewusst?',
  },
  it: {
    heading: "La tua dose d'amore quotidiana",
    subheading:
      "Una dose fresca di saggezza sulle relazioni, una curiosità sull'amore e una citazione senza tempo, rinnovate ogni giorno.",
    updatedDaily: 'Nuovo ogni giorno',
    insightOfTheDay: 'Il consiglio del giorno',
    didYouKnow: 'Lo sapevi?',
  },
  pt: {
    heading: 'Sua dose diária de amor',
    subheading:
      'Uma dose fresca de sabedoria sobre relacionamentos, uma curiosidade sobre o amor e uma citação atemporal, renovadas todos os dias.',
    updatedDaily: 'Novo todos os dias',
    insightOfTheDay: 'Dica do dia',
    didYouKnow: 'Você sabia?',
  },
  ru: {
    heading: 'Ваша ежедневная порция любви',
    subheading:
      'Свежая порция мудрости об отношениях, интересный факт о любви и вечная цитата — обновляются каждый день.',
    updatedDaily: 'Обновляется каждый день',
    insightOfTheDay: 'Совет дня',
    didYouKnow: 'А вы знали?',
  },
  zh: {
    heading: '每日恋爱灵感',
    subheading:
      '每天为你带来一份关于感情的智慧、一个有趣的爱情小知识，以及一句永恒的爱情名言。',
    updatedDaily: '每日更新',
    insightOfTheDay: '今日感悟',
    didYouKnow: '你知道吗？',
  },
  ja: {
    heading: '今日の恋愛インサイト',
    subheading:
      '恋愛の知恵、ちょっとした恋のトリビア、そして時を超えた名言を、毎日お届けします。',
    updatedDaily: '毎日更新',
    insightOfTheDay: '今日のひとこと',
    didYouKnow: '知っていましたか？',
  },
  ar: {
    heading: 'جرعتك اليومية من الحب',
    subheading:
      'جرعة جديدة من حكمة العلاقات، ومعلومة طريفة عن الحب، واقتباس خالد — تتجدد كل يوم.',
    updatedDaily: 'يتجدد كل يوم',
    insightOfTheDay: 'نصيحة اليوم',
    didYouKnow: 'هل تعلم؟',
  },
  hi: {
    heading: 'आपकी रोज़ की लव इनसाइट',
    subheading:
      'रिश्तों की समझ, प्यार से जुड़ा एक मज़ेदार तथ्य, और एक यादगार उद्धरण — हर दिन नया।',
    updatedDaily: 'हर दिन नया',
    insightOfTheDay: 'आज की सलाह',
    didYouKnow: 'क्या आप जानते हैं?',
  },
};
