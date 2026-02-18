
// Support Chatbot - Client-Side Mode (works on static hosting)
(function() {
  'use strict';

  const config = {
    instanceName: 'bible360',
    brandName: 'Bible360',
    provider: 'openrouter',
    model: undefined, // Will be loaded from settings or auto-select from free models
    apiKey: undefined, // Removed hardcoded key - user provides their own
    knowledgeBase: {"chunks":[{"id":"kb-1","content":"Bible360 is a chronological Bible reading plan comparison tool. It helps users compare different chronological reading plans from multiple sources including Blue Letter Bible, Logos Academic, BibleHub, and ESV.","metadata":{"source":"knowledge-base.json","tags":["about","overview","what is"],"category":"general"}},{"id":"kb-2","content":"Bible360 offers 365-day chronological Bible reading plans. Each plan takes you through the entire Bible in historical/chronological order rather than the traditional book order.","metadata":{"source":"knowledge-base.json","tags":["reading plan","365 days","chronological"],"category":"plans"}},{"id":"kb-3","content":"The Blue Letter Bible reading plan is a 365-day chronological plan from Blue Letter Bible (blueletterbible.org). It includes combined readings for some books and spreads Revelation across the final 4 days.","metadata":{"source":"knowledge-base.json","tags":["blue letter bible","blb","provider"],"category":"providers"}},{"id":"kb-4","content":"The Logos Academic reading plan is a 365-day chronological plan from Logos Bible Software (logos.com). It includes all epistles at their correct chronological positions with combined readings for shorter books.","metadata":{"source":"knowledge-base.json","tags":["logos","logos academic","provider"],"category":"providers"}},{"id":"kb-5","content":"The BibleHub reading plan is a 365-day chronological plan from BibleHub.com. It includes Paul's commentary on key passages with theological insights.","metadata":{"source":"knowledge-base.json","tags":["biblehub","provider","commentary"],"category":"providers"}},{"id":"kb-6","content":"Chronological Bible reading means reading the Bible in the order events actually happened historically, rather than in the order of books as they appear in the Bible. For example, Job is read after Genesis 11 because Job lived during the patriarchal period.","metadata":{"source":"knowledge-base.json","tags":["chronological","order","how it works"],"category":"explanation"}},{"id":"kb-7","content":"Each daily reading in Bible360 includes the passage reference, historical context, approximate date, and a description of the theological significance of that reading.","metadata":{"source":"knowledge-base.json","tags":["daily reading","features","context"],"category":"features"}},{"id":"kb-8","content":"The New Testament readings in the chronological plan are placed in their historical order. James is read early (around Acts 13-14) because it was written around AD 45-48, making it one of the earliest NT books.","metadata":{"source":"knowledge-base.json","tags":["new testament","james","chronology","epistles"],"category":"nt"}},{"id":"kb-9","content":"Revelation is always the final book in chronological plans, dated around AD 95 during the reign of Domitian. Bible360 plans spread Revelation across 4 days (chapters 1-5, 6-11, 12-18, 19-22) for better pacing.","metadata":{"source":"knowledge-base.json","tags":["revelation","apocalypse","end times"],"category":"revelation"}},{"id":"kb-10","content":"Bible360 is built with SvelteKit and deployed as a static site. It's open source and available on GitHub at github.com/pokho/Bible360.","metadata":{"source":"knowledge-base.json","tags":["github","open source","technology"],"category":"technical"}},{"id":"kb-11","content":"To use Bible360, simply visit bible360.net and select a reading plan from the available providers. Click on any day to see the readings and historical context. You can compare plans side by side.","metadata":{"source":"knowledge-base.json","tags":["how to use","getting started","tutorial"],"category":"usage"}},{"id":"kb-12","content":"The Apocrypha reading plan includes deuterocanonical books like Tobit, Judith, Wisdom, Sirach, Baruch, and 1-2 Maccabees, read in their historical context.","metadata":{"source":"knowledge-base.json","tags":["apocrypha","deuterocanonical","catholic"],"category":"apocrypha"}},{"id":"kb-13","content":"Primeval History (Before 4000 BC - c. 2000 BC): The earliest period of biblical history covering Creation, the Fall of Adam and Eve, Cain and Abel, the genealogies from Adam to Noah, the Great Flood, and the Tower of Babel. Key books: Genesis 1-11. This period shows God's original perfect creation, humanity's fall into sin, and God's judgment and grace.","metadata":{"source":"knowledge-base.json","tags":["historical period","primeval","creation","flood","genesis"],"category":"historical-periods","priority":3}},{"id":"kb-14","content":"Patriarchal Era (c. 2100-1800 BC): The age of Israel's founding fathers - Abraham, Isaac, Jacob, and Joseph. God established His covenant with Abraham, promising land, descendants, and blessing to all nations. Job also lived during this period. Key events: Abraham's call, Sodom and Gomorrah, binding of Isaac, Jacob's dreams, Joseph in Egypt. Books: Genesis 12-50, Job.","metadata":{"source":"knowledge-base.json","tags":["historical period","patriarchs","abraham","jacob","joseph","job"],"category":"historical-periods","priority":3}},{"id":"kb-15","content":"Exodus and Law (c. 1445-1400 BC): God delivered Israel from Egyptian slavery through Moses, culminating in the Passover and crossing of the Red Sea. At Mount Sinai, God gave the Law (Ten Commandments) and instructions for the Tabernacle. Books: Exodus, Leviticus. This period established Israel as God's covenant nation.","metadata":{"source":"knowledge-base.json","tags":["historical period","exodus","moses","law","sinai","tabernacle"],"category":"historical-periods","priority":3}},{"id":"kb-16","content":"Wilderness Wanderings (c. 1400-1350 BC): After refusing to enter the Promised Land due to fear, Israel wandered in the wilderness for 40 years. The entire generation of adults (except Joshua and Caleb) died. Key events: twelve spies, Korah's rebellion, bronze serpent, Balaam. Book: Numbers. This period taught Israel to trust God completely.","metadata":{"source":"knowledge-base.json","tags":["historical period","wilderness","numbers","wanderings","40 years"],"category":"historical-periods","priority":2}},{"id":"kb-17","content":"Conquest and Judges (c. 1350-1050 BC): Joshua led Israel to conquer Canaan, dividing the land among the twelve tribes. After Joshua's death, Israel entered a cycle of sin, oppression, repentance, and deliverance through judges like Deborah, Gideon, Samson, and Samuel. Books: Joshua, Judges, Ruth. This period shows the consequences of incomplete obedience.","metadata":{"source":"knowledge-base.json","tags":["historical period","conquest","judges","joshua","canaan","gideon","samson"],"category":"historical-periods","priority":3}},{"id":"kb-18","content":"United Monarchy (c. 1050-930 BC): Israel's golden age under three kings: Saul (first king), David (man after God's heart, established Jerusalem), and Solomon (built the Temple, renowned for wisdom). Israel was united as one kingdom. Psalms, Proverbs, and Song of Solomon were written during this era. Books: 1-2 Samuel, 1 Kings 1-11, 1 Chronicles, Psalms, Proverbs.","metadata":{"source":"knowledge-base.json","tags":["historical period","united monarchy","saul","david","solomon","temple","psalms"],"category":"historical-periods","priority":3}},{"id":"kb-19","content":"Divided Kingdom (c. 930-586 BC): After Solomon's death, Israel split into two kingdoms: Israel (north, 10 tribes, capital Samaria) and Judah (south, 2 tribes, capital Jerusalem). Israel fell to Assyria in 722 BC; Judah fell to Babylon in 586 BC. Prophets like Elijah, Elisha, Isaiah, and Jeremiah ministered during this turbulent period. Books: 1-2 Kings, 2 Chronicles, prophetic books.","metadata":{"source":"knowledge-base.json","tags":["historical period","divided kingdom","israel","judah","assyria","babylon","prophets"],"category":"historical-periods","priority":3}},{"id":"kb-20","content":"Exile and Return (c. 586-400 BC): Judah was exiled to Babylon for 70 years. After Persia conquered Babylon, Jews gradually returned in three waves under Zerubbabel, Ezra, and Nehemiah. They rebuilt the Temple (516 BC) and Jerusalem's walls (444 BC). Esther became queen in Persia. Books: Ezra, Nehemiah, Esther, Daniel, Ezekiel. Prophets: Haggai, Zechariah, Malachi.","metadata":{"source":"knowledge-base.json","tags":["historical period","exile","return","babylon","persia","ezra","nehemiah","esther"],"category":"historical-periods","priority":3}},{"id":"kb-21","content":"Life of Christ (c. 4 BC - AD 30): Jesus Christ, the eternal Son of God, was born in Bethlehem, ministered for approximately 3 years, was crucified, and rose from the dead. Key events: incarnation, baptism, temptation, miracles, parables, crucifixion, resurrection, ascension. Books: Matthew, Mark, Luke, John. Jesus fulfilled Old Testament prophecies and established the New Covenant.","metadata":{"source":"knowledge-base.json","tags":["historical period","life of christ","jesus","gospels","resurrection","new covenant"],"category":"historical-periods","priority":3}},{"id":"kb-22","content":"Early Church (c. AD 30-70): After Pentecost, the Holy Spirit empowered believers to spread the gospel from Jerusalem to Judea, Samaria, and the ends of the earth. Paul's missionary journeys established churches across the Roman Empire. Key events: Pentecost, Stephen's martyrdom, Paul's conversion, Jerusalem Council. Book: Acts. Letters from James, Paul, Peter began circulating.","metadata":{"source":"knowledge-base.json","tags":["historical period","early church","acts","pentecost","paul","missionary journeys"],"category":"historical-periods","priority":3}},{"id":"kb-23","content":"Epistles Period (c. AD 45-95): Letters written to churches and individuals explaining Christian doctrine and practice. Paul wrote Romans through Philemon (c. 49-67 AD). General epistles (Hebrews through Jude) were written by various authors. These letters apply Christ's work to daily life and address theological issues. Reading order follows probable chronological writing sequence.","metadata":{"source":"knowledge-base.json","tags":["historical period","epistles","paul","letters","romans","doctrine"],"category":"historical-periods","priority":2}},{"id":"kb-24","content":"Apocalypse (c. AD 95): The apostle John received the revelation of Jesus Christ while exiled on Patmos during Domitian's persecution. Revelation reveals Christ's ultimate victory, the final judgment, and the new heaven and new earth. It concludes the biblical narrative and canon. Key themes: worship, perseverance, Christ's return, God's sovereignty over history.","metadata":{"source":"knowledge-base.json","tags":["historical period","apocalypse","revelation","john","patmos","end times","new creation"],"category":"historical-periods","priority":2}},{"id":"kb-25","content":"Genesis Overview: The book of beginnings. Covers creation (chapters 1-2), the fall (chapter 3), the flood (chapters 6-9), and the patriarchs Abraham, Isaac, Jacob, and Joseph (chapters 12-50). Key themes: God as Creator, human sin, God's covenant promises, election, providence. Genesis establishes the foundation for understanding the entire Bible.","metadata":{"source":"knowledge-base.json","tags":["book overview","genesis","creation","patriarchs","covenant","beginnings"],"category":"book-overviews","priority":3}},{"id":"kb-26","content":"Job Overview: The story of a righteous man who suffered greatly yet maintained his faith. Job lived during the patriarchal period (likely before Abraham). The book addresses the problem of evil and suffering, divine sovereignty, and human limitation. After extensive dialogue with friends and God's response, Job is humbled and restored. Key verse: 'Though he slay me, yet will I hope in him' (Job 13:15).","metadata":{"source":"knowledge-base.json","tags":["book overview","job","suffering","sovereignty","faith","wisdom"],"category":"book-overviews","priority":2}},{"id":"kb-27","content":"Psalms Overview: The songbook of Israel, containing 150 psalms written by David, Asaph, the sons of Korah, Moses, Solomon, and others. Types include lament, praise, thanksgiving, royal, wisdom, and messianic psalms. Psalms expresses the full range of human emotion in relationship with God. Key psalms: 23 (Shepherd), 51 (Repentance), 119 (God's Word), 139 (God's omniscience).","metadata":{"source":"knowledge-base.json","tags":["book overview","psalms","david","worship","prayer","songs","emotion"],"category":"book-overviews","priority":3}},{"id":"kb-28","content":"Isaiah Overview: The 'fifth gospel' contains more messianic prophecies than any other prophetic book. Isaiah ministered in Judah from 740-700 BC, warning of judgment while promising future restoration through the Messiah. Key passages: Immanuel (7:14), Wonderful Counselor (9:6-7), Suffering Servant (chapter 53). Isaiah 53 describes Christ's substitutionary atonement in remarkable detail.","metadata":{"source":"knowledge-base.json","tags":["book overview","isaiah","messiah","prophecy","servant","immanuel","suffering servant"],"category":"book-overviews","priority":3}},{"id":"kb-29","content":"Revelation Overview: The final book reveals Jesus Christ in His glory and final victory. Written by John around AD 95 during persecution, it uses apocalyptic imagery to encourage faithfulness. Structure: Christ and the churches (1-3), throne room worship (4-5), seven seals, trumpets, bowls (6-16), Babylon's fall (17-18), Christ's return (19), final judgment (20), new creation (21-22). 'Behold, I am making all things new' (21:5).","metadata":{"source":"knowledge-base.json","tags":["book overview","revelation","apocalypse","christ","judgment","new creation","victory"],"category":"book-overviews","priority":3}},{"id":"kb-30","content":"What is chronological Bible reading? It means reading Scripture in the order events occurred historically rather than the traditional book arrangement. This helps readers understand the flow of redemptive history, see how prophecies relate to their fulfillment, and understand the cultural context. For example, Job is placed early (after Genesis 11) because he likely lived during the patriarchal period.","metadata":{"source":"knowledge-base.json","tags":["faq","chronological","order","how it works","explanation"],"category":"faq","priority":3}},{"id":"kb-31","content":"How are biblical dates determined? Scholars use internal biblical evidence (genealogies, reign lengths, cross-references) combined with external historical sources (Assyrian, Babylonian, Egyptian records). Conservative scholars generally date creation around 4000 BC, the Exodus around 1446 BC, and Solomon's temple around 966 BC. Some dates have uncertainty, especially for early events.","metadata":{"source":"knowledge-base.json","tags":["faq","chronology","dates","dating","how determined","scholarship"],"category":"faq","priority":2}},{"id":"kb-32","content":"Why is Job placed early in chronological plans? Job likely lived during the patriarchal period (c. 2100-1800 BC) because: (1) he lived 140 years after his trial, consistent with pre-Mosaic lifespans; (2) his wealth was measured in livestock like the patriarchs; (3) he acted as priest for his family like Abraham and Job; (4) there's no mention of the Mosaic Law or tabernacle.","metadata":{"source":"knowledge-base.json","tags":["faq","job","placement","chronology","patriarchal","early"],"category":"faq","priority":2}},{"id":"kb-33","content":"How do the four reading plan providers differ? Blue Letter Bible (BLB) follows a traditional evangelical chronology. Logos Academic uses scholarly resources from Logos Bible Software. BibleHub includes Paul's commentary with theological insights and typology. ESV provides the English Standard Version's chronological plan. All cover the entire Bible in 365 days but arrange some books differently.","metadata":{"source":"knowledge-base.json","tags":["faq","providers","difference","blb","logos","biblehub","esv"],"category":"faq","priority":2}},{"id":"kb-34","content":"What version should I read? Bible360 links to BibleHub which offers multiple translations. For study, consider: ESV (accurate, readable), NASB (formally equivalent), NIV (dynamic equivalence), KJV (traditional). The Passion Translation (TPT) offers devotional insights especially for poetic books. Reading multiple translations can deepen understanding.","metadata":{"source":"knowledge-base.json","tags":["faq","translations","versions","esv","niv","nasb","tpt"],"category":"faq","priority":1}},{"id":"kb-35","content":"Genealogy and Name Meanings (Adam to Jesus): The lineage from Adam to Christ reveals God's redemptive plan. Key Hebrew name meanings: Eve = LIFE-GIVER, Seth = SUBSTITUTE (replacing Abel), Enoch = DEDICATED to God, Noah = REST, Abraham = FATHER OF MANY, Isaac = HE LAUGHS, Jacob = HE DECEIVES (later Israel = HE STRUGGLES WITH GOD), Judah = PRAISE. David and Bathsheba (DAUGHTER-OF-AN-OATH) are in Christ's lineage (Matthew 1, Luke 3).","metadata":{"source":"knowledge-base.json","tags":["paul commentary","genealogy","names","adam","jesus","lineage","hebrew"],"category":"paul-commentary","priority":3}},{"id":"kb-36","content":"The Ark as a Type of Christ: Noah's ark prefigures Jesus Christ. (1) Only one door - Jesus said 'I am the door' (John 10:9). (2) The ark was the ONLY way of salvation from the flood - Jesus is the ONLY way to the Father (John 14:6). (3) The pitch covering (Hebrew 'kaphar') is the same word for ATONEMENT - Christ is our atonement covering us from judgment. (4) Inside the ark = safety; outside = destruction.","metadata":{"source":"knowledge-base.json","tags":["paul commentary","typology","ark","christ","noah","salvation","atonement"],"category":"paul-commentary","priority":3}},{"id":"kb-37","content":"Noah as a Type of Christ: Noah prefigures Christ in several ways. (1) Noah was 'righteous' and 'found favor' (grace) in God's eyes (Genesis 6:8-9), pointing to the truly Righteous One. (2) Through Noah, his family was saved from judgment; through Christ, His people are saved from divine wrath. (3) Noah's name means REST, and Jesus says 'Come to me...and I will give you rest' (Matthew 11:28).","metadata":{"source":"knowledge-base.json","tags":["paul commentary","typology","noah","christ","righteous","salvation","rest"],"category":"paul-commentary","priority":3}},{"id":"kb-38","content":"The Dove and Olive Branch: When the dove returned with an olive leaf (Genesis 8:11), it signaled new life after the flood judgment. This points to the Holy Spirit who descended 'like a dove' at Jesus' baptism (Matthew 3:16). Jesus is our peace (Ephesians 2:14) - the olive branch of reconciliation between God and humanity. The dove represents the Spirit bringing peace and new creation.","metadata":{"source":"knowledge-base.json","tags":["paul commentary","typology","dove","olive branch","holy spirit","peace","baptism"],"category":"paul-commentary","priority":2}},{"id":"kb-39","content":"The Rainbow Covenant: God established a covenant with Noah using the rainbow as its sign (Genesis 9:12-17), promising never to destroy the earth with a flood again. This covenant points forward to the New Covenant in Christ's blood (Luke 22:20) - a promise of eternal salvation rather than destruction. Every rainbow reminds us of God's faithfulness and points to His ultimate promise in Christ.","metadata":{"source":"knowledge-base.json","tags":["paul commentary","covenant","rainbow","noah","new covenant","promise","faithfulness"],"category":"paul-commentary","priority":2}},{"id":"kb-40","content":"Flood and Baptism: 1 Peter 3:20-21 explicitly connects the flood to Christian baptism: 'In the days of Noah...eight souls were saved through water. There is also an antitype which now saves us - baptism.' The flood waters symbolize baptism into Christ's death and resurrection - the ultimate washing that brings salvation. As Noah passed through the waters of judgment to a new world, believers pass through baptism into new life.","metadata":{"source":"knowledge-base.json","tags":["paul commentary","flood","baptism","1 peter","salvation","new life","resurrection"],"category":"paul-commentary","priority":3}},{"id":"kb-41","content":"Romans 11:36 - All Things in Christ: 'For from Him and through Him and to Him are all things.' This verse captures the cosmic reality that everything is FROM Christ, THROUGH Christ, and FOR Christ. All things originate from Him, exist through Him, and find their purpose and completion in Him. John 1:1-3 parallels Genesis 1:1 - the Word who became flesh is the eternal Son present at creation, through whom all things were made (Colossians 1:16-17).","metadata":{"source":"knowledge-base.json","tags":["paul commentary","romans","christ","creation","sovereignty","purpose","cosmic"],"category":"paul-commentary","priority":3}},{"id":"kb-42","content":"TPT Recommendation for Genesis: The Passion Translation (TPT) version of Genesis is highly recommended, especially chapter 2, which beautifully portrays the intimacy of God's relationship with humanity. TPT brings out devotional and emotional dimensions that complement more literal translations. It's particularly helpful for devotional reading alongside study Bibles like ESV or NASB.","metadata":{"source":"knowledge-base.json","tags":["paul commentary","tpt","translation","genesis","devotional","intimacy"],"category":"paul-commentary","priority":2}},{"id":"kb-43","content":"John 1 and Genesis 1 Connection: John 1:1 ('In the beginning was the Word') parallels Genesis 1:1 ('In the beginning God created'). The Word who became flesh (John 1:14) is the eternal Son, present at creation, through whom all things were made (John 1:3, Colossians 1:16-17). When Genesis speaks of God creating, judging, and covenanting, we are seeing the triune God at work, with the Son as the divine agent of creation and redemption.","metadata":{"source":"knowledge-base.json","tags":["paul commentary","john","genesis","word","christ","creation","trinity"],"category":"paul-commentary","priority":2}},{"id":"kb-44","content":"Biblical Chronology Disclaimer: Biblical chronology involves some uncertainty, especially for early events. Scholars use genealogies, archaeological evidence, and ancient records to estimate dates. Conservative scholars generally agree on the overall timeline but may differ on specific dates. Bible360 presents dates based on conservative evangelical scholarship while acknowledging the inherent limitations of ancient dating methods.","metadata":{"source":"knowledge-base.json","tags":["faq","chronology","uncertainty","scholarship","dating","limitations"],"category":"faq","priority":1}}],"metadata":{"version":"2.0.0","exportedAt":"2026-02-18T09:18:18.615Z","totalChunks":44,"categories":["general","plans","providers","explanation","features","nt","revelation","technical","usage","apocrypha","historical-periods","book-overviews","faq","paul-commentary"],"compressed":false}},
    escalationEnabled: false,
    oksomeUrl: '',
    escalationThreshold: 50,
    mode: 'support',
    autoOpen: true,
    draggable: false,
    constrainToViewport: true,
    rememberPosition: true,
    dragHandleStyle: 'bar',
  };

  // Settings management
  const SETTINGS_KEY = 'chatbot_settings';

  function loadSettings() {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        const settings = JSON.parse(stored);
        return {
          apiKey: settings.apiKey || null,
          model: settings.model || null
        };
      }
    } catch (e) {
      console.warn('Could not load settings:', e);
    }
    return { apiKey: null, model: null };
  }

  function saveSettings(apiKey, model) {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify({
        apiKey: apiKey,
        model: model || null
      }));
      // Update config and cache
      config.model = model || undefined;
      apiKeyCache = apiKey;
      console.log('%c✓ Settings saved', 'color: #10b981');
    } catch (e) {
      console.error('Could not save settings:', e);
    }
  }

  function openSettings() {
    const modal = document.getElementById('sc-settings-modal');
    const keyInput = document.getElementById('sc-api-key-input');
    const modelSelect = document.getElementById('sc-model-select');

    if (!modal) return;

    // Load current settings
    const settings = loadSettings();
    if (keyInput) keyInput.value = settings.apiKey || '';

    // Populate model dropdown
    populateModelSelect();

    if (modelSelect) {
      modelSelect.value = settings.model || '';
    }

    modal.style.display = 'flex';
  }

  function closeSettings() {
    const modal = document.getElementById('sc-settings-modal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  function populateModelSelect() {
    const modelSelect = document.getElementById('sc-model-select');
    if (!modelSelect) return;

    // Clear existing options except the first one
    while (modelSelect.options.length > 1) {
      modelSelect.remove(1);
    }

    // Add free models
    freeModels.forEach(modelId => {
      const option = document.createElement('option');
      option.value = modelId;
      option.textContent = modelId;
      modelSelect.appendChild(option);
    });
  }

  
        // Draggable disabled - no drag handle or CSS
      
  
// Client-side RAG (Retrieval-Augmented Generation)
function searchKnowledge(query) {
  if (!config.knowledgeBase || !config.knowledgeBase.chunks) {
    return { chunks: [], context: '', confidence: 0 };
  }

  const queryWords = query.toLowerCase().split(/\s+/);
  const scoredChunks = config.knowledgeBase.chunks.map(chunk => {
    const content = chunk.content.toLowerCase();
    let score = 0;

    // Exact phrase match
    if (content.includes(query.toLowerCase())) {
      score += 50;
    }

    // Word matches
    for (const word of queryWords) {
      if (word.length > 2 && content.includes(word)) {
        score += 10;
      }
    }

    // Tag matches
    if (chunk.metadata.tags) {
      for (const tag of chunk.metadata.tags) {
        if (queryWords.some(qw => tag.toLowerCase().includes(qw))) {
          score += 15;
        }
      }
    }

    // Priority boost
    if (chunk.metadata.priority) {
      score += chunk.metadata.priority * 5;
    }

    return { chunk, score };
  });

  // Sort by score and filter relevant results
  scoredChunks.sort((a, b) => b.score - a.score);
  const relevantChunks = scoredChunks
    .filter(s => s.score > 0)
    .slice(0, 5)
    .map(s => s.chunk);

  // Build context from relevant chunks
  const context = relevantChunks
    .map(c => `[Source: ${c.metadata.source}] ${c.content}`)
    .join('\n\n');

  const confidence = scoredChunks.length > 0 ? Math.min(100, scoredChunks[0].score) : 0;

  return { chunks: relevantChunks, context, confidence };
}

  
// Client-side frustration detection
function detectFrustration(message) {
  const msgLower = message.toLowerCase().trim();
  const msgUpper = message.toUpperCase();
  const msgRaw = message;

  // Escalation keywords
  const escalationKeywords = [
    'human', 'agent', 'person', 'representative', 'support',
    'useless', 'terrible', 'horrible', 'awful', 'stupid',
    'manager', 'supervisor', ' escalate', 'talk to someone'
  ];

  // Check for escalation keywords
  const hasKeyword = escalationKeywords.some(kw => msgLower.includes(kw));

  // ALL CAPS detection (at least 3 words, mostly uppercase)
  const words = msgRaw.split(/\s+/).filter(w => w.length > 0);
  const allCapsWords = words.filter(w => w === w.toUpperCase() && w.length > 1);
  const isAllCaps = words.length >= 3 && allCapsWords.length / words.length > 0.7;

  // Excessive punctuation detection
  const punctuationMatch = msgRaw.match(/[!?]/g);
  const exclamationCount = punctuationMatch ? punctuationMatch.length : 0;
  const hasExcessivePunctuation = exclamationCount >= 3;

  // Repeated characters (e.g., "hellooooo" or "!!!!")
  const repeatedChars = /(.)\1{4,}/.test(msgRaw);

  // Short, angry messages
  const isShortAngry = words.length <= 3 && (
    msgLower.includes('!!!') ||
    msgLower.includes('??') ||
    (msgRaw === msgUpper && msgRaw !== msgLower)
  );

  return {
    shouldEscalate: hasKeyword || isAllCaps || hasExcessivePunctuation || repeatedChars || isShortAngry,
    reason: hasKeyword ? 'escalation_keyword' :
            isAllCaps ? 'all_caps' :
            hasExcessivePunctuation ? 'excessive_punctuation' :
            repeatedChars ? 'repeated_chars' :
            isShortAngry ? 'short_angry' :
            'none',
    confidence: hasKeyword ? 90 :
                 isAllCaps ? 80 :
                 hasExcessivePunctuation ? 70 :
                 repeatedChars ? 60 :
                 isShortAngry ? 75 :
                 0
  };
}

  
// Free models fetched from OpenRouter API (cached locally)
let freeModels = [];
let currentModelIndex = 0;
let modelsFetchFailed = false;

// Fetch free models from OpenRouter API
async function fetchFreeModels() {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models');
    if (!response.ok) {
      throw new Error('Failed to fetch models');
    }
    const data = await response.json();
    // Filter free models (prompt price is 0 or 0.0)
    freeModels = data.data
      .filter(m => m.pricing?.prompt === '0' || m.pricing?.prompt === '0.0')
      .map(m => m.id)
      .sort(); // Sort alphabetically for consistent ordering
    console.log('%c✓ Loaded ' + freeModels.length + ' free models from OpenRouter', 'color: #10b981');
  } catch (error) {
    console.warn('Failed to fetch free models, using fallback list:', error);
    modelsFetchFailed = true;
    // Fallback list of known free models
    freeModels = [
      'arcee-ai/trinity-large-preview:free',
      'google/gemma-3-12b-it:free',
      'google/gemma-3-27b-it:free',
      'google/gemma-3-4b-it:free',
      'mistralai/mistral-small-3.1-24b-instruct:free',
      'stepfun/step-3.5-flash:free',
      'deepseek/deepseek-r1-0528:free',
      'nvidia/nemotron-3-nano-30b-a3b:free',
    ];
  }
}

// Get next available model
function getNextModel() {
  if (freeModels.length === 0) {
    return config.model || 'arcee-ai/trinity-large-preview:free';
  }
  const model = freeModels[currentModelIndex % freeModels.length];
  currentModelIndex++;
  return model;
}

// Reset model index for new conversation
function resetModelIndex() {
  currentModelIndex = 0;
}

// Direct OpenRouter API call with SSE streaming and fallback
async function sendMessageWithStreaming(message, context, apiKey) {
  const provider = config.provider || 'openrouter';
  // Use configured model, or start with first free model
  let model = config.model || null;

  // If no model specified, we'll use free models
  if (!model) {
    if (freeModels.length === 0 && !modelsFetchFailed) {
      await fetchFreeModels();
    }
    model = getNextModel();
    console.log('%c🔄 Using free model: ' + model, 'color: #3b82f6');
  }

  let apiUrl = '';
  let headers = {
    'Content-Type': 'application/json',
    'HTTP-Referer': window.location.href,
  };

  // Configure based on provider
  if (provider === 'openrouter') {
    apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
    headers['Authorization'] = `Bearer ${apiKey}`;
  } else if (provider === 'anthropic') {
    apiUrl = 'https://api.anthropic.com/v1/messages';
    headers['x-api-key'] = apiKey;
    headers['anthropic-version'] = '2023-06-01';
  } else if (provider === 'openai') {
    apiUrl = 'https://api.openai.com/v1/chat/completions';
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  // Build messages array
  const systemMessage = context ?
    `You are a Bible360 Bible Study Assistant - an AI companion for chronological Bible reading and study.

**Knowledge Base Usage:**
Use the provided knowledge base for Bible360 features, reading plans, provider information, historical periods, and book overviews.

**For General Bible Questions:**
You may use your training to answer Bible questions, provide theological insights, and help with Scripture understanding. Draw from biblical history, theology, and cross-references.

**Guidelines:**
- Be warm, encouraging, and spiritually helpful
- Acknowledge that biblical chronology has some uncertainty
- Be honest when you don't know something

**Knowledge Base:**
${context}` :
    `You are a Bible360 Bible Study Assistant. Help users understand Scripture in its historical context. You may use your training for general Bible questions.`;

  const messages = provider === 'anthropic' ? [
    { role: 'user', content: message }
  ] : [
    { role: 'system', content: systemMessage },
    { role: 'user', content: message }
  ];

  // Request body
  const body = provider === 'anthropic' ? {
    model: model,
    system: systemMessage,
    messages: messages,
    max_tokens: 4096,
    stream: true
  } : {
    model: model,
    messages: messages,
    stream: true
  };

  // Try with current model, fallback to next free model on error
  let lastError = null;
  let maxRetries = freeModels.length > 0 ? Math.min(freeModels.length, 5) : 1;
  let response;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    if (!config.model) {
      model = getNextModel();
      body.model = model;
      console.log('%c🔄 Attempt ' + (attempt + 1) + '/' + maxRetries + ' with model: ' + model, 'color: #f59e0b');
    }

    try {
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorText = await response.text();
        // If using free models and this is not the last attempt, try next model
        if (!config.model && attempt < maxRetries - 1) {
          console.warn('%c⚠️ Model ' + model + ' failed, trying next free model...', 'color: #f59e0b');
          continue;
        }
        throw new Error(`API error (${response.status}): ${errorText}`);
      }

      // Success! Break out of retry loop
      console.log('%c✅ Model ' + model + ' responded successfully', 'color: #10b981');
      break;
    } catch (err) {
      lastError = err;
      // If using free models and this is not the last attempt, try next model
      if (!config.model && attempt < maxRetries - 1) {
        console.warn('%c⚠️ Request failed with ' + model + ', trying next free model...', 'color: #f59e0b');
        continue;
      }
      throw err;
    }
  }

  // If we exhausted all retries without a configured model
  if (lastError && !config.model && freeModels.length > 0) {
    throw new Error('All free models failed. Please provide your own API key for better reliability.');
  }

  // Parse SSE stream
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let fullResponse = '';

  return {
    reader,
    decoder,
    buffer,
    fullResponse,
    parseStream: async function(onChunk, onComplete) {
        while (true) {
          const { done, value } = await this.reader.read();
          if (done) break;

          this.buffer += this.decoder.decode(value, { stream: true });

          // SSE format: "data: {...}\n\n"
          const lines = this.buffer.split('\n\n');
          this.buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();

              if (data === '[DONE]') continue;

              try {
                let json;
                if (provider === 'openrouter') {
                  json = JSON.parse(data);
                  if (json.choices?.[0]?.delta?.content) {
                    const token = json.choices[0].delta.content;
                    this.fullResponse += token;
                    onChunk(token);
                  }
                } else if (provider === 'anthropic') {
                  json = JSON.parse(data);
                  if (json.type === 'content_block_delta' && json.delta?.text) {
                    const token = json.delta.text;
                    this.fullResponse += token;
                    onChunk(token);
                  }
                } else if (provider === 'openai') {
                  json = JSON.parse(data);
                  if (json.choices?.[0]?.delta?.content) {
                    const token = json.choices[0].delta.content;
                    this.fullResponse += token;
                    onChunk(token);
                  }
                }
              } catch (e) {
                // Skip invalid JSON
                console.warn('Failed to parse SSE data:', data);
              }
            }
          }
        }

      if (onComplete) onComplete(this.fullResponse);
    }
  };
}

// Get API key from settings
async function getApiKey() {
  // Check settings (localStorage)
  const settings = loadSettings();
  if (settings.apiKey) {
    return settings.apiKey;
  }

  // No key stored - show settings modal
  openSettings();

  // Return a promise that resolves when settings are saved
  return new Promise((resolve, reject) => {
    const checkSettings = () => {
      const newSettings = loadSettings();
      if (newSettings.apiKey) {
        resolve(newSettings.apiKey);
      } else {
        reject(new Error('API key is required. Please enter your OpenRouter API key in Settings.'));
      }
    };

    // Set up one-time listener for save button
    const saveBtn = document.getElementById('sc-save-settings');
    if (saveBtn) {
      const originalHandler = saveBtn.onclick;
      saveBtn.onclick = (e) => {
        if (originalHandler) originalHandler(e);
        setTimeout(checkSettings, 100);
      };
    }
  });
}


  // DOM Elements - will be initialized when elements are available
  let container, chatButton, chatWindow, closeButton, messagesContainer, inputField, sendButton, escalationNotice;
  let isOpen = false;
  let conversationHistory = [];
  let apiKeyCache = null;
  let isDragging = false;
  let dragOffset = { x: 0, y: 0 };
  let savedPosition = { x: null, y: null };

  // Initialize DOM elements
  function initElements() {
    container = document.getElementById('sc-widget-container');
    chatButton = document.getElementById('sc-chat-button');
    chatWindow = document.getElementById('sc-chat-window');
    closeButton = document.getElementById('sc-close-button');
    messagesContainer = document.getElementById('sc-messages');
    inputField = document.getElementById('sc-input-field');
    sendButton = document.getElementById('sc-send-button');
    escalationNotice = document.getElementById('sc-escalation-notice');

    return chatButton && chatWindow && closeButton && messagesContainer && inputField && sendButton;
  }

  // Toggle chat window
  async function toggleChat() {
    // Re-query chat window in case Svelte re-rendered it
    const win = document.getElementById('sc-chat-window');
    if (!win) {
      console.error('Chat window not found');
      return;
    }

    isOpen = !isOpen;
    win.classList.toggle('sc-open', isOpen);
    console.log('%c🔄 Chat toggled, isOpen:', 'color: #3b82f6', isOpen);
    if (isOpen) {
      const input = document.getElementById('sc-input-field');
      if (input) input.focus();
      // Fetch and log free models when chatbot opens (if not already fetched)
      if (freeModels.length === 0 && !modelsFetchFailed && !config.model) {
        await fetchFreeModels();
      }
      console.log('%c📱 Chatbot opened', 'color: #3b82f6; font-weight: bold');
      if (!config.model) {
        console.log('%cFree models available on OpenRouter (' + freeModels.length + ' total):', 'color: #6b7280; font-weight: bold');
        freeModels.slice(0, 5).forEach((m, i) => console.log('  ' + (i + 1) + '. ' + m));
        if (freeModels.length > 5) {
          console.log('  ... and ' + (freeModels.length - 5) + ' more');
        }
        console.log('%c✨ Chatbot will automatically try free models if one fails.', 'color: #10b981; font-style: italic');
      }
    }
  }

  // Add message to chat
  function addMessage(content, isUser = false, container = null) {
    const msgContainer = container || document.getElementById('sc-messages');
    if (!msgContainer) {
      console.error('Messages container not found');
      return;
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = 'sc-message ' + (isUser ? 'user' : 'bot');
    messageDiv.textContent = content;
    msgContainer.appendChild(messageDiv);
    msgContainer.scrollTop = msgContainer.scrollHeight;

    conversationHistory.push({
      role: isUser ? 'user' : 'assistant',
      content: content,
      timestamp: new Date().toISOString(),
    });

    // Save to localStorage
    saveConversation();
  }

  // Show typing indicator
  function showTyping(container = null) {
    const msgContainer = container || document.getElementById('sc-messages');
    if (!msgContainer) return;

    const typingDiv = document.createElement('div');
    typingDiv.className = 'sc-message typing';
    typingDiv.id = 'sc-typing';
    typingDiv.innerHTML = '<div class="sc-typing-indicator"><span></span><span></span><span></span></div>';
    msgContainer.appendChild(typingDiv);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  // Hide typing indicator
  function hideTyping() {
    const typing = document.getElementById('sc-typing');
    if (typing) {
      typing.remove();
    }
  }

  // Save conversation to localStorage
  function saveConversation() {
    try {
      localStorage.setItem('chatbot_conversation', JSON.stringify(conversationHistory));
    } catch (e) {
      console.warn('Could not save conversation:', e);
    }
  }

  // Load conversation from localStorage
  function loadConversation() {
    try {
      const saved = localStorage.getItem('chatbot_conversation');
      if (saved) {
        conversationHistory = JSON.parse(saved);
        return true;
      }
    } catch (e) {
      console.warn('Could not load conversation:', e);
    }
    return false;
  }

  // Restore conversation to UI
  function restoreConversation() {
    const messagesContainer = document.getElementById('sc-messages');
    if (!messagesContainer || conversationHistory.length === 0) return;

    // Clear existing messages
    messagesContainer.innerHTML = '';

    // Add each message
    conversationHistory.forEach(msg => {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'sc-message ' + (msg.role === 'user' ? 'user' : 'bot');
      messageDiv.textContent = msg.content;
      messagesContainer.appendChild(messageDiv);
    });

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Export conversation as text file
  function exportConversation() {
    if (conversationHistory.length === 0) {
      alert('No conversation to export yet.');
      return;
    }

    const lines = [
      '═══════════════════════════════════════════════════════════════',
      '                    BIBLE360 CHATBOT CONVERSATION',
      '═══════════════════════════════════════════════════════════════',
      '',
    ];

    conversationHistory.forEach(msg => {
      const timestamp = msg.timestamp ? new Date(msg.timestamp).toLocaleString() : '';
      const role = msg.role === 'user' ? 'YOU' : 'BIBLE360';
      lines.push(`[${timestamp}] ${role}:`);
      lines.push(msg.content);
      lines.push('');
      lines.push('───────────────────────────────────────────────────────────────');
      lines.push('');
    });

    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push(`Exported on: ${new Date().toLocaleString()}`);
    lines.push('═══════════════════════════════════════════════════════════════');

    const text = lines.join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `bible360-chat-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log('%c📥 Conversation exported', 'color: #10b981');
  }

  // Drag functionality for chatbot widget
  function initDrag() {
    if (!config.draggable?.enabled) return;

    const dragHandle = document.getElementById('sc-drag-handle');
    if (!dragHandle) return;

    // Mouse events
    dragHandle.addEventListener('mousedown', startDrag);

    // Touch events
    dragHandle.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      startDrag({ clientX: touch.clientX, clientY: touch.clientY });
    }, { passive: false });

    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      drag({ clientX: touch.clientX, clientY: touch.clientY });
    }, { passive: false });

    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDragTouch);

    // Restore saved position on load
    if (config.rememberPosition && savedPosition.x !== null && container) {
      container.style.left = savedPosition.x + 'px';
      container.style.top = savedPosition.y + 'px';
    }
  }

  function startDrag(e) {
    if (!config.draggable) return;
    isDragging = true;
    if (container) container.classList.add('dragging');

    const rect = container.getBoundingClientRect();
    dragOffset.x = e.clientX - rect.left;
    dragOffset.y = e.clientY - rect.top;

    // Save initial position for potential restore
    const currentX = parseFloat(container.style.left) || 0;
    const currentY = parseFloat(container.style.top) || 0;
    savedPosition = { x: currentX.toString(), y: currentY.toString() };
  }

  function drag(e) {
    if (!isDragging || !container) return;

    e.preventDefault();

    const x = e.clientX - dragOffset.x;
    const y = e.clientY - dragOffset.y;

    // Constrain to viewport
    const maxX = window.innerWidth - 400;
    const maxY = window.innerHeight - 550;

    container.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
    container.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
    container.style.right = 'auto';
    container.style.bottom = 'auto';

    // Save position
    savedPosition = { x: container.style.left, y: container.style.top };

    // Store in localStorage
    try {
      localStorage.setItem('chatbot-position', JSON.stringify(savedPosition));
    } catch (e) {
      console.warn('Could not save position:', e);
    }
  }

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    if (container) container.classList.remove('dragging');
  }

  function endDragTouch() {
    endDrag();
  }

  // Send message to AI
  async function sendMessage(message) {
    if (!message.trim()) return;

    // Re-query elements in case Svelte re-rendered them
    const input = document.getElementById('sc-input-field');
    const send = document.getElementById('sc-send-button');
    const messages = document.getElementById('sc-messages');

    if (!input || !send || !messages) {
      console.error('Chatbot elements not found');
      return;
    }

    // Add user message
    addMessage(message, true, messages);
    input.value = '';
    send.disabled = true;

    // Check for frustration
    const frustration = detectFrustration(message);
    if (frustration.shouldEscalate && config.escalationEnabled) {
      showTyping(messages);

      const escalationEl = document.getElementById('sc-escalation-notice');
      setTimeout(() => {
        hideTyping();
        if (escalationEl) escalationEl.style.display = 'block';
        setTimeout(() => {
          if (escalationEl) escalationEl.style.display = 'none';
          addMessage('I understand you need assistance. Let me connect you with a human agent who can better help you.', false, messages);
          if (config.oksomeUrl) {
            window.open(config.oksomeUrl, '_blank');
          }
        }, 1500);
      }, 500);

      send.disabled = false;
      input.focus();
      return;
    }

    // Search knowledge base
    const kb = searchKnowledge(message);
    showTyping(messages);

    // Create streaming message div
    const messageDiv = document.createElement('div');
    messageDiv.className = 'sc-message bot';
    messages.appendChild(messageDiv);

    try {
      // Get API key (cache it)
      if (!apiKeyCache) {
        apiKeyCache = await getApiKey();
      }

      // Send message with streaming
      const stream = await sendMessageWithStreaming(message, kb.context, apiKeyCache);

      hideTyping();

      await stream.parseStream(
        (token) => {
          messageDiv.textContent += token;
          messages.scrollTop = messages.scrollHeight;
        },
        (fullResponse) => {
          conversationHistory.push({
            role: 'assistant',
            content: fullResponse,
            timestamp: new Date().toISOString(),
          });
          saveConversation();
        }
      );

    } catch (error) {
      hideTyping();
      messageDiv.textContent = 'I apologize, I\'m having trouble connecting. Please check your API key or try again later.';
      console.error('Chatbot error:', error);
    } finally {
      send.disabled = false;
      input.focus();
    }
  }

  // Main initialization function
  function init() {
    // Try to initialize elements, retry if not ready
    if (!initElements()) {
      console.log('%c⏳ Chatbot waiting for DOM elements...', 'color: #f59e0b');
      setTimeout(init, 100);
      return;
    }

    // Load settings on init
    const settings = loadSettings();
    if (settings.model) {
      config.model = settings.model;
    }
    if (settings.apiKey) {
      apiKeyCache = settings.apiKey;
    }

    // Use event delegation for better compatibility with Svelte hydration
    document.addEventListener('click', (e) => {
      // Handle chat button click
      if (e.target.closest('#sc-chat-button')) {
        e.preventDefault();
        e.stopPropagation();
        toggleChat();
        return;
      }
      // Handle close button click
      if (e.target.closest('#sc-close-button')) {
        e.preventDefault();
        e.stopPropagation();
        toggleChat();
        return;
      }
      // Handle send button click
      if (e.target.closest('#sc-send-button')) {
        e.preventDefault();
        const input = document.getElementById('sc-input-field');
        if (input) sendMessage(input.value);
        return;
      }
      // Handle export button click
      if (e.target.closest('#sc-export-button')) {
        e.preventDefault();
        exportConversation();
        return;
      }
      // Handle settings button click
      if (e.target.closest('#sc-settings-button')) {
        e.preventDefault();
        e.stopPropagation();
        openSettings();
        return;
      }
      // Handle save settings button click
      if (e.target.closest('#sc-save-settings')) {
        e.preventDefault();
        const keyInput = document.getElementById('sc-api-key-input');
        const modelSelect = document.getElementById('sc-model-select');
        const apiKey = keyInput ? keyInput.value.trim() : '';
        const model = modelSelect ? modelSelect.value : '';

        if (!apiKey) {
          alert('Please enter an API key.');
          return;
        }

        saveSettings(apiKey, model);
        closeSettings();
        return;
      }
      // Handle cancel settings button click
      if (e.target.closest('#sc-cancel-settings')) {
        e.preventDefault();
        closeSettings();
        return;
      }
      // Close modal when clicking overlay
      if (e.target.id === 'sc-settings-modal') {
        closeSettings();
        return;
      }
    });

    // Re-query elements when needed for input handling
    document.addEventListener('keypress', (e) => {
      const input = document.getElementById('sc-input-field');
      if (e.target === input && e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(input.value);
      }
    });

    // Keyboard shortcut (Ctrl/Cmd + K)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleChat();
      }
    });

    console.log('%c🤖 Support chatbot initialized (client-side mode)', 'color: #10b981; font-weight: bold');
    console.log('%cProvider:', 'color: #6b7280', config.provider);
    console.log('%cModel:', 'color: #6b7280', config.model || '(auto-selecting from free models)');
    console.log('%cKnowledge chunks:', 'color: #6b7280', config.knowledgeBase?.metadata?.totalChunks || 0);
    console.log('%cAuto-open:', 'color: #6b7280', config.autoOpen ? 'enabled' : 'disabled');

    // Load saved conversation from localStorage
    if (loadConversation()) {
      restoreConversation();
      console.log('%c💾 Restored previous conversation (' + conversationHistory.length + ' messages)', 'color: #10b981');
    }

    // Fetch free models on initialization (needed for settings dropdown)
    fetchFreeModels().then(() => {
      if (freeModels.length > 0) {
        console.log('%c✓ Fetched ' + freeModels.length + ' free models for automatic fallback', 'color: #10b981');
      }
    }).catch(err => {
      console.warn('Failed to fetch free models:', err);
    });

    // Initialize drag functionality
    initDrag();

    // Auto-open chatbot on page load if configured
    if (config.autoOpen) {
      setTimeout(() => {
        if (!isOpen) {
          toggleChat();
        }
        // Show settings modal if no API key is stored
        if (!settings.apiKey) {
          setTimeout(() => {
            openSettings();
          }, 300);
        }
      }, 500);
    }
  }

  // Start initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
