import json

with open('public/locales/de.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Find the first relationshipQuiz (should be in 'quizzes' section)
first_quiz = None
for key, value in data['quizzes'].items():
    if key == 'relationshipQuiz':
        first_quiz = value
        break

if first_quiz and 'results' in first_quiz:
    # Check if perfectMatch exists
    if 'perfectMatch' not in first_quiz['results']:
        # Add perfectMatch result
        first_quiz['results']['perfectMatch'] = {
            'title': 'Perfekte Übereinstimmung 🌟',
            'description': 'Sie haben eine außergewöhnliche Beziehung mit starker Ausrichtung in allen Bereichen. Ihre Verbindung ist tiefgreifend und ausgewogen.',
            'message': 'Perfekte Übereinstimmung! Ihre Beziehung zeigt starke Grundlagen in allen Kernbereichen.',
            'strengths': [
                'Herausragende Kommunikation über Ziele',
                'Vollständiges Vertrauen und Verständnis',
                'Perfekt abgestimmte Zukunftsziele',
                'Natürliche Konfliktlösung'
            ],
            'tips': [
                'Pflegen Sie diese schöne Verbindung',
                'Teilen Sie Ihre Erkenntnisse mit anderen Paaren',
                'Bleiben Sie dankbar für das, was Sie haben',
                'Wachsen Sie weiterhin zusammen'
            ]
        }
        
        # Add message fields to other results if missing
        for result_key in ['thriving', 'solid', 'developing', 'challenging']:
            if result_key in first_quiz['results'] and 'message' not in first_quiz['results'][result_key]:
                if result_key == 'thriving':
                    first_quiz['results'][result_key]['message'] = 'Blühende Beziehung! Sie haben eine gesunde, unterstützende Partnerschaft aufgebaut.'
                elif result_key == 'solid':
                    first_quiz['results'][result_key]['message'] = 'Solide Beziehung! Sie haben eine starke Beziehung mit kleineren Bereichen zur Verbesserung.'
                elif result_key == 'developing':
                    first_quiz['results'][result_key]['message'] = 'Sich Entwickelnde Beziehung! Ihre Beziehung hat Potenzial, aber mehrere Bereiche brauchen Aufmerksamkeit.'
                elif result_key == 'challenging':
                    first_quiz['results'][result_key]['message'] = 'Herausfordernde Beziehung! Ihre Beziehung steht vor erheblichen Herausforderungen.'

# Save the file
with open('public/locales/de.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print('Successfully updated the first relationshipQuiz with perfectMatch and message fields') 