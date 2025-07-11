const fs = require('fs');
const path = require('path');

// Read the current Japanese translations
const jaPath = path.join(__dirname, 'public/locales/ja.json');
const jaContent = fs.readFileSync(jaPath, 'utf8');
let currentTranslations = JSON.parse(jaContent);

// Final quiz sections to add
const finalQuizSections = {
  "futureGoalsCompatibility": {
    "title": "将来の目標相性クイズ",
    "subtitle": "あなたの人生の夢がどれほど一致しているかを見る",
    "description": "あなたの将来の目標、ライフスタイルの好み、人生計画がパートナーとどれほど相性が良いかを発見しましょう。",
    "questions": {
      "q1": {
        "question": "5年後、キャリア面で最も重要なことは何ですか？",
        "options": {
          "opt1": "企業の階段を上り、リーダーシップの役割を達成すること",
          "opt2": "安定した充実した仕事でワークライフバランスを見つけること",
          "opt3": "自分の上司になり、成功したビジネスを経営すること",
          "opt4": "旅行し、リモートで働く柔軟性を持つこと"
        }
      },
      "q2": {
        "question": "将来の理想的な勤務スケジュールは何ですか？",
        "options": {
          "opt1": "必要に応じて残業の可能性があるフルタイムキャリア",
          "opt2": "明確なワークライフ境界を持つ標準的なフルタイム",
          "opt3": "家族/個人時間のためのパートタイムや柔軟なスケジュール",
          "opt4": "時間を完全にコントロールできるフリーランスや起業"
        }
      },
      "q3": {
        "question": "子供を持つことについて（もしあるなら）いつ頃を考えていますか？",
        "options": {
          "opt1": "すでに持っているか、今後2-3年以内に欲しい",
          "opt2": "より確立されてから5-7年後",
          "opt3": "いつかかもしれないが、今は優先事項ではない",
          "opt4": "子供は欲しくないか、不確かです"
        }
      },
      "q4": {
        "question": "家族の近くに住むことはどれほど重要ですか？",
        "options": {
          "opt1": "必須 - 両親/兄弟から30分以内",
          "opt2": "好ましい - 同じ市内または数時間のドライブ以内",
          "opt3": "良いが必須ではない - 同じ州または地域で大丈夫",
          "opt4": "重要ではない - 私たちにとって最適な場所に住める"
        }
      },
      "q5": {
        "question": "10年後、どこに住んでいると思いますか？",
        "options": {
          "opt1": "多くの機会と興奮がある大都市で",
          "opt2": "良い家と良い学校がある郊外で",
          "opt3": "平和と静けさのための小さな町や田舎で",
          "opt4": "頻繁に旅行するか、異なる場所に住む"
        }
      },
      "q6": {
        "question": "友情と社会生活についてのあなたのビジョンは何ですか？",
        "options": {
          "opt1": "頻繁な社交的集まりがある友人の大きなサークル",
          "opt2": "定期的だがバランスの取れた社交がある密接な友人グループ",
          "opt3": "時々の会合がある非常に親しい友人の小グループ",
          "opt4": "一緒に静かな時間を好み、最小限の社会的義務"
        }
      },
      "q7": {
        "question": "将来の幸福にとって経済的安全はどれほど重要ですか？",
        "options": {
          "opt1": "必須 - 裕福で経済的に独立していたい",
          "opt2": "非常に重要 - 快適で借金のない状態でいたい",
          "opt3": "やや重要 - ニーズといくつかの欲求をカバーするのに十分",
          "opt4": "あまり重要ではない - お金は幸福を買わない"
        }
      },
      "q8": {
        "question": "大きな購入と財務決定をどのように扱いたいですか？",
        "options": {
          "opt1": "100ドル以上のすべてについて常に話し合い、合意する",
          "opt2": "500-1000ドル以上の主要な購入について一緒に話し合う",
          "opt3": "少額では個人的な自由を持ち、大きなものは話し合う",
          "opt4": "時々のチェックインでほとんど独立した財務決定"
        }
      },
      "q9": {
        "question": "主要な人生決定へのあなたのアプローチは何ですか？",
        "options": {
          "opt1": "詳細な戦略ですべてを注意深く計画する",
          "opt2": "機会に対して柔軟性を保ちながら一般的な計画を持つ",
          "opt3": "流れに身を任せ、人生が何をもたらすかを見る",
          "opt4": "すべての上であなたの心と直感に従う"
        }
      },
      "q10": {
        "question": "継続教育と個人的成長はどれほど重要ですか？",
        "options": {
          "opt1": "非常に重要 - 常に新しいスキルを学び成長している",
          "opt2": "重要 - 追加の教育や認定を追求している",
          "opt3": "やや重要 - 機会が生じた時に学習する",
          "opt4": "優先事項ではない - 他の人生目標に焦点を当てる"
        }
      }
    },
    "results": {
      "excellent": {
        "title": "将来のソウルメイト！🌟",
        "description": "あなたの将来の目標は信じられないほど一致しています！あなたたちは似たようなことを望み、夢を達成するための相性の良いタイムラインを持っています。"
      },
      "veryGood": {
        "title": "素晴らしい人生パートナー！💫",
        "description": "あなたは将来の目標に強い相性を持っており、話し合いと妥協が必要な分野もあります。"
      },
      "good": {
        "title": "良い基盤！🌱",
        "description": "あなたは多くの似た目標を共有していますが、優先順位とタイムラインの違いについて取り組む必要があるかもしれません。"
      },
      "needsDiscussion": {
        "title": "重要な会話が先にあります！💬",
        "description": "あなたは将来の目標にいくつかの重要な違いがあり、真剣な話し合いと妥協に値します。"
      }
    },
    "categories": {
      "career": "キャリア",
      "family": "家族",
      "lifestyle": "ライフスタイル",
      "finances": "財務",
      "personal": "個人的成長"
    },
    "strongestAreas": "最強の領域",
    "growthAreas": "議論すべき領域"
  },
  "conflictResolutionStyle": {
    "title": "対立解決スタイルクイズ",
    "subtitle": "意見の相違をどのように扱うかを発見",
    "description": "対立への自然なアプローチを学び、意見の相違の間にパートナーとよりよく働く方法を学びましょう。",
    "questions": {
      "q1": {
        "question": "あなたとパートナーが重要なことについて意見が合わない時、最初の直感は：",
        "options": {
          "opt1": "両方にとって機能する解決策を見つける",
          "opt2": "あなたが正しいことを理解するまで論争する",
          "opt3": "平和を保ち対立を避けるために譲る",
          "opt4": "話題を変えるか会話から離れる",
          "opt5": "途中で会い、それぞれが何かを妥協する"
        }
      },
      "q2": {
        "question": "激しい議論の間、あなたは通常：",
        "options": {
          "opt1": "彼らの視点を理解し、共通点を見つけようとする",
          "opt2": "あなたの立場についてより大きくより主張的になる",
          "opt3": "意見が合わなくても後退し謝罪する",
          "opt4": "感情的にシャットダウンし参加を止める",
          "opt5": "休憩を取り後で中間点を見つけることを提案する"
        }
      },
      "q3": {
        "question": "議論に勝つことへのあなたのアプローチは：",
        "options": {
          "opt1": "議論は勝つことではなく真実を見つけることについてであるべき",
          "opt2": "準備がよくて持続的なので通常勝つ",
          "opt3": "議論に勝つのは嫌い、関係を傷つける",
          "opt4": "議論を完全に避けようとする",
          "opt5": "いくつか勝ちいくつか負けることを喜んでする"
        }
      },
      "q4": {
        "question": "何かについて明らかに正しいがパートナーが同意しない時：",
        "options": {
          "opt1": "私の視点を理解してもらうことに焦点を当てる",
          "opt2": "私が正しいことを認めるまで議論し続ける",
          "opt3": "調和を保つために彼らが正しいと思わせる",
          "opt4": "それを落として他のことに移る",
          "opt5": "一度私の事例を提示してからそれを手放す"
        }
      },
      "q5": {
        "question": "喧嘩の後、あなたは通常：",
        "options": {
          "opt1": "両方が理解するまで完全に話し抜きたい",
          "opt2": "あなたのポイントが有効だったという認識を期待する",
          "opt3": "調和を回復するために最初に謝る",
          "opt4": "それが吹き飛んで物事が正常に戻ることを願う",
          "opt5": "両方にとって機能する妥協を見つけることを提案する"
        }
      },
      "q6": {
        "question": "パートナーがあなたについて苦情を持ち出す時：",
        "options": {
          "opt1": "注意深く聞き、解決策について一緒に働く",
          "opt2": "自分を守り、なぜそのように行動したかを説明する",
          "opt3": "謝り、彼らが気分良くなるようにしようとする",
          "opt4": "圧倒され、処理するためのスペースが必要と感じる",
          "opt5": "彼らのポイントを認め、中間で会うことを申し出る"
        }
      },
      "q7": {
        "question": "対立中のあなたの最大の恐れは：",
        "options": {
          "opt1": "一緒に問題を解決できないこと",
          "opt2": "パートナーがあなたの視点を尊重しないこと",
          "opt3": "対立があなたの関係を損傷すること",
          "opt4": "感情が激しくなりすぎて圧倒的になること",
          "opt5": "どちらも結果に満足しないこと"
        }
      },
      "q8": {
        "question": "問題を話し合う時、あなたは次を好みます：",
        "options": {
          "opt1": "問題を完全に探索するために必要なだけ時間をかける",
          "opt2": "あなたの事例を明確に提示し、彼らからも同じことを期待する",
          "opt3": "感情とつながりの維持に焦点を当てる",
          "opt4": "話し合いを簡潔で解決策に焦点を当てる",
          "opt5": "効率的に物事を解決するための迅速な妥協を見つける"
        }
      },
      "q9": {
        "question": "あなたの対立解決の強みは：",
        "options": {
          "opt1": "みんなのために機能する創造的な解決策を見つける",
          "opt2": "重要な原則と価値観に対してしっかりと立つ",
          "opt3": "困難な時期を通して愛とつながりを維持する",
          "opt4": "冷静を保ち感情的な状況をエスカレートしない",
          "opt5": "公平で迅速に中間点を見つける"
        }
      },
      "q10": {
        "question": "パートナーの感情を傷つけた時、あなたは：",
        "options": {
          "opt1": "正確にどのようになぜかを理解し、解決策に取り組みたい",
          "opt2": "あなたの意図を説明し、彼らに理解してもらうことを期待する",
          "opt3": "すぐに謝り、彼らが気分良くなることに焦点を当てる",
          "opt4": "悪く感じるが、それについて話し合う前に処理する時間が必要",
          "opt5": "謝り、それが再び起こらないようにする方法を提案する"
        }
      }
    },
    "results": {
      "collaborative": {
        "title": "協調的問題解決者 🤝",
        "description": "あなたはウィンウィンの解決策を見つけるために一緒に働くことを信じています。あなたとパートナーのニーズの両方を平等に大切にします。",
        "strengths": [
          "創造的な解決策を見つけるのが得意",
          "両方の視点を大切にする",
          "より強い関係を築く",
          "根本原因に対処する"
        ],
        "challenges": [
          "より多くの時間がかかることがある",
          "迅速な決定を避けるかもしれない",
          "パートナーの協力が必要",
          "疲れることがある"
        ],
        "tips": [
          "この健康的なアプローチを育み続ける",
          "パートナーが時間を必要とする時に忍耐強くある",
          "迅速な決定が必要な時に協力を強制しない"
        ],
        "partnerAdvice": [
          "公平性への彼らのコミットメントを感謝する",
          "問題解決にオープンに関与する",
          "一緒に問題に取り組む時間を与える"
        ]
      },
      "competing": {
        "title": "直接的競争者 🏆",
        "description": "あなたは自分の立場にしっかりと立ち、自分の視点を強く主張することを好みます。正しくあることと勝つことを大切にします。",
        "strengths": [
          "あなたのニーズについて明確",
          "困難な状況で決断力がある",
          "重要な価値観のために立ち上がる",
          "迅速に結果を得る"
        ],
        "challenges": [
          "関係の調和を損傷するかもしれない",
          "対立をエスカレートさせることがある",
          "パートナーが聞かれていないと感じるかもしれない",
          "妥協の機会を逃すかもしれない"
        ],
        "tips": [
          "積極的な傾聴を練習する",
          "パートナーの感情を考慮する",
          "あなたの戦いを賢く選ぶ",
          "ただ議論するのではなく質問をする"
        ],
        "partnerAdvice": [
          "重要な問題では自分の立場を守る",
          "あなたの視点を見るのを助ける",
          "彼らの情熱とコミットメントを感謝する"
        ]
      },
      "accommodating": {
        "title": "調和の番人 🕊️",
        "description": "あなたは関係の平和とパートナーの幸福を優先します。調和のためにあなたの好みを犠牲にすることを喜んでします。",
        "strengths": [
          "関係の平和を維持する",
          "犠牲を通して愛を示す",
          "破壊的な対立を避ける",
          "安全な感情的空間を作る"
        ],
        "challenges": [
          "あなたのニーズが満たされないかもしれない",
          "時間とともに怒りを築くことがある",
          "問題が完全に解決されないかもしれない",
          "パートナーがあなたの真の感情を知らないかもしれない"
        ],
        "tips": [
          "あなたのニーズを表現することを練習する",
          "健康的な境界を設定する",
          "それらが築き上がる前に問題に対処する",
          "あなたの意見も重要であることを覚えている"
        ],
        "partnerAdvice": [
          "彼らが真の感情をシェアすることを励ます",
          "定期的に彼らのニーズをチェックする",
          "彼らの調節を利用しない"
        ]
      },
      "avoiding": {
        "title": "対立回避者 🚪",
        "description": "あなたは対立から離れ、緊張が自然に解決することを好みます。感情を処理するためのスペースが必要です。",
        "strengths": [
          "エスカレーションを防ぐ",
          "感情が冷める時間を与える",
          "傷つく言葉を言うのを避ける",
          "価値ある視点を提供できる"
        ],
        "challenges": [
          "問題が解決されないかもしれない",
          "パートナーが無視されていると感じるかもしれない",
          "問題が時間とともに築き上がることがある",
          "成長の機会を逃すかもしれない"
        ],
        "tips": [
          "問題を話し合うための特定の時間をスケジュールする",
          "短時間でも存在することを練習する",
          "スペースへのあなたのニーズを伝える",
          "冷めた後に問題に対処するために戻る"
        ],
        "partnerAdvice": [
          "必要な時にスペースを与える",
          "問題を話し合うための穏やかな時間をスケジュールする",
          "彼らの処理時間に忍耐強くある"
        ]
      },
      "compromising": {
        "title": "公正な交渉者 ⚖️",
        "description": "あなたは公平性と中間点を見つけることを信じています。ほとんどの状況で得るために与えることを喜んでします。",
        "strengths": [
          "公正な結果を作る",
          "迅速な解決",
          "両当事者が何かを得る",
          "実用的で現実的"
        ],
        "challenges": [
          "より深い問題に対処しないかもしれない",
          "両当事者が不満を感じるかもしれない",
          "思慮深いものよりもルーチンになることがある",
          "コアの問題を扱うことを避けるかもしれない"
        ],
        "tips": [
          "時々ウィンウィンの解決策のためにより深く掘る",
          "妥協が両方にとって公正に感じることを確認する",
          "表面の問題だけでなく根本的なニーズに対処する"
        ],
        "partnerAdvice": [
          "彼らの公平性を感謝する",
          "妥協がバランスが取れていないと感じる時に声を上げる",
          "時々より協調的な解決策について一緒に働く"
        ]
      }
    },
    "yourChallenges": "あなたの課題",
    "tipsForYou": "あなたのためのヒント",
    "adviceForPartner": "パートナーへのアドバイス"
  }
};

// Add the final quiz sections to the existing quizzes
Object.assign(currentTranslations.quizzes, finalQuizSections);

// Write the updated translations back to the file
try {
  fs.writeFileSync(jaPath, JSON.stringify(currentTranslations, null, 2), 'utf8');
  console.log('🎉 SUCCESS! All Japanese quiz translations have been completed!');
  console.log('📝 Final additions:');
  console.log('   - Future Goals Compatibility Quiz (10 questions + 4 results + categories)');
  console.log('   - Conflict Resolution Style Quiz (10 questions + 5 conflict styles)');
  console.log('');
  console.log('✅ Complete Japanese translation summary:');
  console.log('   • Common quiz elements and navigation');
  console.log('   • Relationship Quiz (8 questions)');
  console.log('   • Communication Style Quiz (10 questions, 4 styles)');
  console.log('   • Love Language Assessment (10 questions, 5 love languages)');
  console.log('   • Future Goals Compatibility (10 questions, 4 result types)');
  console.log('   • Conflict Resolution Style (10 questions, 5 resolution styles)');
  console.log('');
  console.log('🚀 All raw keys should now be properly translated in Japanese!');
  console.log('📱 Users should now see proper Japanese text instead of raw translation keys.');
} catch (error) {
  console.error('❌ Error writing final translations:', error);
  process.exit(1);
} 