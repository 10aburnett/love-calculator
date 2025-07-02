const fs = require('fs');
const path = require('path');

// Read the current Japanese translations
const jaPath = path.join(__dirname, 'public/locales/ja.json');
const jaContent = fs.readFileSync(jaPath, 'utf8');

// Parse the current content, handling potential JSON errors
let currentTranslations;
try {
  currentTranslations = JSON.parse(jaContent);
} catch (error) {
  console.error('Error parsing current Japanese translations:', error);
  process.exit(1);
}

// Missing quiz translations
const missingQuizTranslations = {
  "quizzes": {
    "common": {
      "question": "質問 {{current}} / {{total}}",
      "tryAgain": "再試行",
      "shareResults": "結果をシェア",
      "yourStrengths": "あなたの強み",
      "growthTips": "成長のヒント",
      "yourScore": "あなたのスコア",
      "percentage": "{{percentage}}% マッチ",
      "primaryStyle": "主要スタイル",
      "primary": "主要",
      "exploreOtherQuizzes": "他のクイズを探索",
      "communicationStyleQuiz": "コミュニケーションスタイルクイズ",
      "loveLanguageAssessment": "愛の言語評価",
      "futureGoalsCompatibility": "将来の目標相性",
      "conflictResolutionQuiz": "対立解決スタイルクイズ",
      "relationshipQuiz": "関係クイズ",
      "discoverYourPatterns": "あなたのコミュニケーションパターンを発見",
      "discoverYourLoveLanguages": "あなたの主要な愛の言語を発見",
      "discoverYourLoveLanguage": "あなたの愛の言語を発見",
      "seeHowAligned": "あなたの人生目標がどれほど一致しているかを見る",
      "learnYourApproach": "あなたの対立解決アプローチを学ぶ",
      "answerQuestions": "あなたの関係について質問に答える",
      "learnYourCommunicationStyle": "あなたのコミュニケーションスタイルを学ぶ",
      "alignYourFutureGoals": "あなたの将来の目標を調整",
      "whatYoullDiscoverConflict": "対立解決について発見すること",
      "conflictFocus": "対立フォーカス",
      "transformDisagreements": "意見の相違を成長の機会に変える",
      "yourConflictStyleBreakdown": "あなたの対立スタイルの内訳",
      "identifyYourPrimaryApproach": "意見の相違を扱うあなたの主要なアプローチを特定",
      "learnEffectiveTechniques": "より良い対立解決のための効果的なテクニックを学ぶ",
      "discoverHowToBuild": "対立中のより強いコミュニケーションを構築する方法を発見",
      "collaborative": "協調的",
      "competing": "競争的",
      "accommodating": "迎合的",
      "avoiding": "回避的",
      "compromising": "妥協的",
      "loveCalculator": "恋愛計算機",
      "yourConflictStyle": "あなたの対立スタイル",
      "resolutionStrategies": "解決戦略",
      "relationshipImprovement": "関係改善",
      "yourLoveLanguageScores": "あなたの愛の言語スコア",
      "loveFocus": "愛フォーカス",
      "understandHowYouExpress": "あなたがどのように愛を表現し受け取るかを理解",
      "communicationFocus": "コミュニケーションフォーカス",
      "understandYourPatterns": "あなたのコミュニケーションパターンを理解し、より深いつながりを築く",
      "whyCommunicationMatters": "なぜコミュニケーションスタイルが重要なのか",
      "betterUnderstanding": "より良い理解",
      "learnHowYouCommunicate": "あなたが自然にコミュニケーションを取る方法と、パートナーがあなたのメッセージをどのように受け取るかを学ぶ",
      "reduceConflicts": "対立を減らす",
      "understandingDifferentStyles": "異なるコミュニケーションスタイルを理解することで、誤解や議論を防ぐ",
      "strongerConnection": "より強いつながり",
      "adaptYourCommunication": "パートナーとのより大きな親密さとつながりを作るためにコミュニケーションを適応させる",
      "relationshipFocus": "関係フォーカス",
      "whyTakeOurQuiz": "なぜ私たちのクイズを受けるのか",
      "selfAwareness": "自己認識",
      "gainInsights": "あなたの関係パターンと改善領域への洞察を得る",
      "communication": "コミュニケーション",
      "startMeaningfulConversations": "パートナーとあなたの関係について意味のある会話を始める",
      "growth": "成長",
      "identifyStrengths": "祝うべき強みと一緒に成長できる領域を特定",
      "whatYoullLearn": "愛の言語評価から学ぶこと",
      "yourPrimaryLoveLanguage": "あなたの主要な愛の言語",
      "discoverWhichLoveLanguage": "5つの愛の言語のうち、どれがあなたの心に最も深く響き、共鳴するかを発見",
      "howToExpressLove": "愛を表現する方法",
      "learnBestWaysToShow": "パートナーのユニークな愛の言語の好みに基づいて愛を示す最良の方法を学ぶ",
      "relationshipGrowthTips": "関係成長のヒント",
      "getPersonalizedAdvice": "より良い愛の言語理解を通じて関係を強化するためのパーソナライズされたアドバイスを得る",
      "goalsFocus": "目標フォーカス",
      "alignYourDreams": "あなたの夢を調整し、共有する未来を築く",
      "whatFutureGoalsWillReveal": "将来の目標相性クイズが明らかにすること",
      "goalAlignmentScore": "目標調整スコア",
      "seeHowCloselyGoals": "あなたの人生目標と夢がパートナーの将来のビジョンとどれほど密接に一致するかを見る",
      "sharedPathPlanning": "共有パス計画",
      "learnHowToCreate": "一緒に将来の共有ロードマップを作成し、個人の夢を調整する方法を学ぶ",
      "compromiseStrategies": "妥協戦略",
      "getTipsOnNavigating": "目標の違いをナビゲートし、関係にとってウィンウィンの解決策を見つけるヒントを得る",
      "compatible": "相性",
      "yourStrongestAreas": "あなたの最強の領域",
      "areasForDiscussion": "議論すべき領域",
      "detailedCompatibilityBreakdown": "詳細な相性内訳",
      "careerGoals": "キャリア目標",
      "familyPlans": "家族計画",
      "lifestyle": "ライフスタイル",
      "financialGoals": "財務目標",
      "personalGrowth": "個人的成長"
    },
    "relationshipQuiz": {
      "title": "関係相性クイズ",
      "subtitle": "あなたの関係がどれほど強いかを発見",
      "description": "あなたの関係の強さと相性についての洞察を得るために、包括的な8問の関係クイズを受けてください。",
      "questions": {
        "q1": {
          "question": "あなたとパートナーはどのくらいの頻度で意味のある会話をしますか？",
          "options": {
            "opt1": "毎日",
            "opt2": "週に数回",
            "opt3": "週1回",
            "opt4": "めったにない"
          }
        },
        "q2": {
          "question": "意見が合わない時、通常どのように対立を解決しますか？",
          "options": {
            "opt1": "冷静に話し合う",
            "opt2": "時間は必要だが解決に向かう",
            "opt3": "言い争うがすぐに仲直りする",
            "opt4": "その話題を避ける"
          }
        },
        "q3": {
          "question": "あなたたちの将来の目標や夢はどれほど一致していますか？",
          "options": {
            "opt1": "完璧に一致している",
            "opt2": "ほとんど似ている",
            "opt3": "いくつかの違いがある",
            "opt4": "大きく異なる"
          }
        },
        "q4": {
          "question": "一緒にどのくらいの質の高い時間を過ごしますか？",
          "options": {
            "opt1": "十分で、楽しんでいる",
            "opt2": "良い量",
            "opt3": "もっと多くても良い",
            "opt4": "十分ではない"
          }
        },
        "q5": {
          "question": "お互いの友人や家族とはどのように接していますか？",
          "options": {
            "opt1": "みんな大好き",
            "opt2": "よく仲良くやっている",
            "opt3": "いくつかの課題がある",
            "opt4": "頻繁に問題がある"
          }
        },
        "q6": {
          "question": "あなたのニーズや感情をどれほどよくコミュニケーションしますか？",
          "options": {
            "opt1": "非常にオープンに",
            "opt2": "かなりよく",
            "opt3": "時々苦労する",
            "opt4": "めったに表現しない"
          }
        },
        "q7": {
          "question": "困難な時期にお互いをどのようにサポートしますか？",
          "options": {
            "opt1": "いつもお互いのためにいる",
            "opt2": "通常はサポート的",
            "opt3": "時々",
            "opt4": "これに苦労している"
          }
        },
        "q8": {
          "question": "あなたたちのライフスタイルの好みはどれほど相性が良いですか？",
          "options": {
            "opt1": "非常に相性が良い",
            "opt2": "ほとんど相性が良い",
            "opt3": "いくつかの違いがある",
            "opt4": "かなり異なる"
          }
        }
      },
      "results": {
        "perfectMatch": {
          "title": "完璧なマッチ！💖",
          "message": "あなたたち二人は関係の目標です！あなたの相性は最高レベルです。"
        },
        "greatCompatibility": {
          "title": "素晴らしい相性！💕",
          "message": "あなたは優秀な可能性を持つ強い関係を持っています。"
        },
        "goodFoundation": {
          "title": "良い基盤！💛",
          "message": "あなたは成長の余地がある堅実な関係を持っています。"
        },
        "workInProgress": {
          "title": "進行中の作業！💪",
          "message": "すべての関係は努力とコミュニケーションで改善できます。"
        }
      }
    }
  }
};

// Remove any existing corrupted quizzes section
if (currentTranslations.quizzes) {
  delete currentTranslations.quizzes;
}

// Add the missing quiz translations
Object.assign(currentTranslations, missingQuizTranslations);

// Write the corrected translations back to the file
try {
  fs.writeFileSync(jaPath, JSON.stringify(currentTranslations, null, 2), 'utf8');
  console.log('✅ Successfully updated Japanese translations with missing quiz sections');
  console.log('📝 Added quiz translations for:');
  console.log('   - Common quiz elements');
  console.log('   - Relationship Quiz');
  console.log('   - (Communication, Love Language, Goals, and Conflict quizzes to be added next)');
} catch (error) {
  console.error('❌ Error writing updated translations:', error);
  process.exit(1);
} 