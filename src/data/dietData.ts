export interface Meal {
  id: string;
  type: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  title: string;
  description: string;
  prepTime: string;
  calories: number;
  protein: number; // in grams
  carbs: number;   // in grams
  fats: number;    // in grams
  fiber: number;   // in grams
  glycemicIndex: "Very Low" | "Low" | "Medium";
  superfoodTags: string[];
  ingredients: string[];
  instructions: string[];
  clinicalBenefit: string;
}

export interface FoodGuideline {
  food: string;
  benefitOrHarm: string;
  category: string;
}

export interface HealthConditionDiet {
  id: string;
  name: string;
  subtitle: string;
  clinicalTarget: string;
  badge: string;
  overview: string;
  baseCalories: number;
  targetMacros: {
    proteinPct: number;
    carbsPct: number;
    fatsPct: number;
  };
  meals: Meal[];
  recommendedFoods: FoodGuideline[];
  restrictedFoods: FoodGuideline[];
  clinicalTips: string[];
}

export const dietData: Record<string, HealthConditionDiet> = {
  diabetes: {
    id: "diabetes",
    name: "Type 2 Diabetes & Insulin Resistance",
    subtitle: "Low Glycemic Index & Glucose Stabilization Protocol",
    clinicalTarget: "Target: Postprandial Glucose < 130 mg/dL • High Viscous Fiber",
    badge: "Metabolic Control",
    overview:
      "Engineered to prevent blood glucose spikes, optimize insulin receptor sensitivity, and sustain steady cellular energy through slow-digesting complex carbohydrates, high soluble fiber, and healthy monounsaturated fats.",
    baseCalories: 1850,
    targetMacros: {
      proteinPct: 30,
      carbsPct: 30,
      fatsPct: 40,
    },
    meals: [
      {
        id: "dia-b1",
        type: "Breakfast",
        title: "Sprouted Chia & Cinnamon Power Bowl with Pasture Eggs",
        description:
          "Two pasture-raised poached eggs over sautéed organic spinach, alongside a chia seed pudding infused with Ceylon cinnamon and crushed Ceylon walnuts.",
        prepTime: "12 mins",
        calories: 420,
        protein: 26,
        carbs: 18,
        fats: 28,
        fiber: 11,
        glycemicIndex: "Very Low",
        superfoodTags: ["Ceylon Cinnamon", "Chia Soluble Fiber", "Pasture Choline"],
        ingredients: [
          "2 Organic pasture-raised eggs",
          "2 tbsp Whole chia seeds",
          "1 cup Baby spinach sautéed in 1 tsp olive oil",
          "1/2 tsp Organic Ceylon cinnamon (insulin sensitizer)",
          "15g Raw crushed walnuts",
          "Unsweetened organic almond milk (100ml)",
        ],
        instructions: [
          "Soak chia seeds with almond milk and Ceylon cinnamon for 10 minutes.",
          "Lightly sauté baby spinach in extra virgin olive oil with sea salt and garlic.",
          "Poach pasture eggs in simmering water with a splash of apple cider vinegar for 3 minutes.",
          "Plate together and top chia pudding with crushed raw walnuts.",
        ],
        clinicalBenefit:
          "Ceylon cinnamon improves cell glucose uptake by mimicking insulin, while chia fiber halts carbohydrate absorption curves.",
      },
      {
        id: "dia-l1",
        type: "Lunch",
        title: "Wild Alaskan Salmon & Roasted Cauliflower Quinoa Bowl",
        description:
          "Pan-seared omega-3 rich sockeye salmon over steamed tri-color quinoa, roasted spiced cauliflower florets, mashed Haas avocado, and lemon-tahini dressing.",
        prepTime: "20 mins",
        calories: 610,
        protein: 42,
        carbs: 34,
        fats: 32,
        fiber: 10,
        glycemicIndex: "Low",
        superfoodTags: ["Omega-3 EPA/DHA", "Sulforaphane", "Monounsaturated Fats"],
        ingredients: [
          "180g Wild Alaskan Sockeye Salmon fillet",
          "1/2 cup Cooked tri-color quinoa",
          "1.5 cups Roasted cauliflower with turmeric & black pepper",
          "1/2 Hass avocado, sliced",
          "1 tbsp Lemon-tahini dressing (tahini, lemon juice, water, garlic)",
          "1 cup Fresh arugula leaves",
        ],
        instructions: [
          "Toss cauliflower with turmeric, olive oil, and roast at 400°F (200°C) for 15 minutes.",
          "Sear salmon skin-side down in a hot skillet for 4 minutes, flip and cook for 3 minutes.",
          "Assemble bowl with fresh arugula base, warm quinoa, roasted cauliflower, and sliced avocado.",
          "Drizzle with lemon-tahini dressing and serve immediately.",
        ],
        clinicalBenefit:
          "High dietary magnesium from avocado and quinoa enhances insulin sensitivity while wild omega-3s reduce vascular inflammation.",
      },
      {
        id: "dia-d1",
        type: "Dinner",
        title: "Herb-Crusted Free-Range Chicken Breast with Asparagus & Lentils",
        description:
          "Rosemary and garlic grilled chicken breast paired with Puy French lentils, roasted lemon asparagus spears, and a drizzle of polyphenolic cold-pressed olive oil.",
        prepTime: "25 mins",
        calories: 580,
        protein: 48,
        carbs: 38,
        fats: 22,
        fiber: 12,
        glycemicIndex: "Low",
        superfoodTags: ["Prebiotic Inulin", "Lean Amino Acids", "Polyphenol EVOO"],
        ingredients: [
          "200g Free-range chicken breast",
          "1/2 cup Cooked French Puy green lentils",
          "8-10 Tender green asparagus spears",
          "1 tbsp Extra virgin olive oil (high polyphenol)",
          "Fresh rosemary, crushed garlic, and sea salt",
        ],
        instructions: [
          "Marinate chicken with garlic, rosemary, sea salt, and a touch of olive oil.",
          "Grill chicken over medium heat for 6-7 minutes per side until 165°F internal temperature.",
          "Roast asparagus spears for 8 minutes until tender-crisp.",
          "Serve alongside warmed Puy lentils with an EVOO drizzle.",
        ],
        clinicalBenefit:
          "Lentil resistant starch feeds short-chain fatty acid producing gut bacteria (butyrate), enhancing GLP-1 secretion naturally.",
      },
    ],
    recommendedFoods: [
      {
        food: "Non-Starchy Leafy Greens (Spinach, Kale, Swiss Chard)",
        benefitOrHarm: "Packed with lutein and magnesium; zero glycemic impact on insulin curves.",
        category: "Vegetables",
      },
      {
        food: "Wild-Caught Fatty Fish (Salmon, Sardines, Mackerel)",
        benefitOrHarm: "Potent anti-inflammatory EPA/DHA reduces cardiovascular risk common with diabetes.",
        category: "Proteins",
      },
      {
        food: "Extra Virgin Olive Oil & Hass Avocados",
        benefitOrHarm: "Monounsaturated fats that lower fasting blood glucose and improve lipid markers.",
        category: "Healthy Fats",
      },
      {
        food: "Organic Ceylon Cinnamon & Apple Cider Vinegar",
        benefitOrHarm: "Proven clinical blunting effect on postprandial glucose spikes when taken with meals.",
        category: "Spices & Superfoods",
      },
      {
        food: "Legumes & Lentils (Puy lentils, chickpeas)",
        benefitOrHarm: "Rich in amylose resistant starch and inositol that enhance peripheral insulin sensitivity.",
        category: "Complex Carbs",
      },
    ],
    restrictedFoods: [
      {
        food: "Refined White Flour & Pastries",
        benefitOrHarm: "Rapidly degrades into pure glucose, triggering steep glycemic and insulin spikes.",
        category: "Refined Carbs",
      },
      {
        food: "Sugar-Sweetened Beverages & Commercial Fruit Juices",
        benefitOrHarm: "Concentrated liquid fructose induces rapid hepatic de novo lipogenesis and fatty liver.",
        category: "Beverages",
      },
      {
        food: "Ultra-Processed Snack Bars & Artificial Sweeteners (Sucralose)",
        benefitOrHarm: "Disrupts gut microbiome diversity, impairing natural glucose regulation mechanisms.",
        category: "Ultra-Processed",
      },
      {
        food: "Hydrogenated Trans-Fats & Fried Fast Foods",
        benefitOrHarm: "Rigidifies cellular membranes, blocking insulin receptor signaling cascades.",
        category: "Unhealthy Fats",
      },
    ],
    clinicalTips: [
      "Follow the 'Food Order Rule': Eat non-starchy vegetables first, proteins/fats second, and carbohydrates last to blunt glucose spikes by up to 40%.",
      "Engage in a light 10-minute walk immediately following your highest-carb meal to trigger GLUT4 non-insulin glucose disposal into skeletal muscle.",
      "Hydrate with 500ml water and 1 tbsp unfiltered Apple Cider Vinegar 15 minutes before lunch.",
    ],
  },

  pcos: {
    id: "pcos",
    name: "PCOS & Hormonal Equilibrium",
    subtitle: "Androgen-Regulating & Anti-Inflammatory Nutrition",
    clinicalTarget: "Target: Reduce LH/FSH Ratio • Anti-Androgen • Inositol Optimization",
    badge: "Hormone Harmony",
    overview:
      "Designed specifically for women with Polycystic Ovary Syndrome to down-regulate free testosterone, manage insulin resistance, reduce follicular inflammation, and restore natural ovulatory rhythms.",
    baseCalories: 1800,
    targetMacros: {
      proteinPct: 32,
      carbsPct: 28,
      fatsPct: 40,
    },
    meals: [
      {
        id: "pcos-b1",
        type: "Breakfast",
        title: "Spearmint & Berry Inositol Smoothie with Pumpkin Seed Crunch",
        description:
          "Hormone-balancing organic smoothie blended with fresh spearmint leaves, wild blueberries, grass-fed collagen peptides, organic pumpkin seeds, and unsweetened hemp milk.",
        prepTime: "8 mins",
        calories: 390,
        protein: 28,
        carbs: 22,
        fats: 20,
        fiber: 9,
        glycemicIndex: "Low",
        superfoodTags: ["Spearmint Anti-Androgen", "Zinc Rich", "Myo-Inositol"],
        ingredients: [
          "1 Scoop Grass-fed collagen peptides or fermented pea protein",
          "1/2 cup Organic wild blueberries (rich in anthocyanins)",
          "1 tbsp Fresh spearmint leaves or 1 tsp organic spearmint extract",
          "2 tbsp Raw pumpkin seeds (high zinc to block 5-alpha reductase)",
          "1 tbsp Ground flaxseeds (lignans for estrogen clearance)",
          "1 cup Unsweetened hemp or coconut milk",
        ],
        instructions: [
          "Add wild berries, spearmint leaves, and hemp milk to high-speed blender.",
          "Add protein powder and freshly ground flaxseed.",
          "Blend on high for 60 seconds until silky smooth.",
          "Pour into chilled glass and sprinkle raw organic pumpkin seeds on top.",
        ],
        clinicalBenefit:
          "Spearmint demonstrates randomized clinical trial evidence in significantly reducing circulating free testosterone in women with PCOS.",
      },
      {
        id: "pcos-l1",
        type: "Lunch",
        title: "Mediterranean Wild Sardine & Avocado Detox Salad",
        description:
          "Grilled Mediterranean sardines tossed with watercress, shredded fennel, radishes, sliced avocado, capers, and a raw cider vinegar vinaigrette.",
        prepTime: "15 mins",
        calories: 590,
        protein: 38,
        carbs: 24,
        fats: 36,
        fiber: 11,
        glycemicIndex: "Very Low",
        superfoodTags: ["Low-Heavy Metal Omega-3", "Indole-3-Carbinol", "Folate Rich"],
        ingredients: [
          "1 Can (120g) Wild Mediterranean sardines in olive oil",
          "2 cups Fresh watercress and organic baby arugula",
          "1/2 Bulb Crisp fennel, thinly shaved",
          "1/2 Hass avocado, cubed",
          "1 tbsp Capers & Kalamata olives",
          "1 tbsp Raw apple cider vinegar + 1 tbsp cold-pressed olive oil",
        ],
        instructions: [
          "Toss watercress, shaved fennel, and radishes in a shallow salad bowl.",
          "Whisk raw cider vinegar and olive oil with a pinch of sea salt.",
          "Top greens with avocado cubes and wild sardines.",
          "Garnish with capers and fresh fennel fronds.",
        ],
        clinicalBenefit:
          "Watercress and shaved fennel deliver glucosinolates that support hepatic Phase-II estrogen and xenobiotic metabolism.",
      },
      {
        id: "pcos-d1",
        type: "Dinner",
        title: "Wild Cod Fillet with Lemon Artichoke Hearts & Steamed Broccoli",
        description:
          "Pan-roasted Atlantic cod served with grilled Mediterranean artichoke hearts, steamed broccoli florets with toasted almonds, and olive tapenade.",
        prepTime: "22 mins",
        calories: 560,
        protein: 44,
        carbs: 26,
        fats: 28,
        fiber: 10,
        glycemicIndex: "Very Low",
        superfoodTags: ["Selenium", "Cruciferous DIM", "Magnesium"],
        ingredients: [
          "200g Wild Atlantic Cod fillet",
          "1 cup Grilled artichoke hearts (in water/olive oil)",
          "1.5 cups Fresh broccoli florets",
          "15g Sliced toasted almonds",
          "1 tbsp Olive tapenade (kalamata olives, capers, garlic)",
          "Fresh lemon wedges",
        ],
        instructions: [
          "Steam broccoli florets until vibrant green (4-5 minutes) to preserve myrosinase enzyme.",
          "Sear cod in a cast-iron skillet for 3-4 minutes per side until flaky.",
          "Warm artichoke hearts in the pan with lemon juice.",
          "Plate cod over vegetables, spoon tapenade on top, and scatter toasted almonds.",
        ],
        clinicalBenefit:
          "Broccoli provides Diindolylmethane (DIM) to balance estrogen receptor activity, and cod supplies selenium for optimal thyroid T4-to-T3 conversion.",
      },
    ],
    recommendedFoods: [
      {
        food: "Fresh Spearmint Tea (2 cups daily)",
        benefitOrHarm: "Exhibits anti-androgenic properties; clinically shown to lower hirsutism and excess androgen levels.",
        category: "Herbal Botanicals",
      },
      {
        food: "Raw Pumpkin Seeds & Hemp Hearts",
        benefitOrHarm: "Rich source of zinc, which acts as a natural 5-alpha-reductase inhibitor, reducing DHT conversion.",
        category: "Seeds & Nuts",
      },
      {
        food: "Cruciferous Vegetables (Broccoli, Cauliflower, Brussels Sprouts)",
        benefitOrHarm: "Provides natural DIM (Diindolylmethane) and Sulforaphane for estrogen clearance via liver.",
        category: "Vegetables",
      },
      {
        food: "Wild Cold-Water Fish (Sardines, Wild Salmon)",
        benefitOrHarm: "Reduces systemic ovarian inflammation and lowers inflammatory prostaglandins.",
        category: "Proteins",
      },
    ],
    restrictedFoods: [
      {
        food: "Commercial Conventional Dairy (Milk, Cheese with rBGH)",
        benefitOrHarm: "Contains bovine IGF-1 (Insulin-like Growth Factor 1) which stimulates excess ovarian androgen production.",
        category: "Dairy",
      },
      {
        food: "High-Fructose Corn Syrup & Candy",
        benefitOrHarm: "Triggers acute hyperinsulinemia which directly stimulates the ovarian theca cells to synthesize testosterone.",
        category: "Sugars",
      },
      {
        food: "Industrial Seed Oils (Soybean, Corn, Cottonseed)",
        benefitOrHarm: "Excess omega-6 linoleic acid fuels chronic follicular and systemic low-grade inflammation.",
        category: "Refined Oils",
      },
      {
        food: "Excessive Caffeine (> 200mg daily)",
        benefitOrHarm: "Elevates adrenal cortisol output, which can worsen adrenal DHEA-S androgen production.",
        category: "Stimulants",
      },
    ],
    clinicalTips: [
      "Drink 2 cups of brewed organic spearmint tea daily, one in the morning and one in the afternoon.",
      "Pair all carbohydrate sources with protein and healthy fats to eliminate post-meal insulin surges.",
      "Prioritize 8 hours of sleep in complete darkness to regulate melatonin, which directly impacts follicular fluid health.",
    ],
  },

  hearthealth: {
    id: "hearthealth",
    name: "Cardiovascular & Hypertension Care",
    subtitle: "DASH-Mediterranean Arterial Longevity Protocol",
    clinicalTarget: "Target: Blood Pressure < 120/80 • Sodium < 1,500mg • Potassium/Sodium Ratio > 3:1",
    badge: "Arterial Health",
    overview:
      "Formulated according to rigorous American Heart Association & European Society of Cardiology clinical benchmarks. Focuses on endothelium nitric oxide bioavailability, low sodium, abundant potassium, and rich cardioprotective polyphenols.",
    baseCalories: 1950,
    targetMacros: {
      proteinPct: 25,
      carbsPct: 45,
      fatsPct: 30,
    },
    meals: [
      {
        id: "hh-b1",
        type: "Breakfast",
        title: "Steel-Cut Oats with Ground Flax, Blueberries & Walnuts",
        description:
          "Slow-cooked Irish steel-cut oats stirred with fresh ground golden flaxseed, ripe wild blueberries, crushed raw walnuts, and Ceylon cinnamon.",
        prepTime: "15 mins",
        calories: 430,
        protein: 16,
        carbs: 58,
        fats: 18,
        fiber: 13,
        glycemicIndex: "Low",
        superfoodTags: ["Beta-Glucan", "ALA Omega-3", "Nitric Oxide Booster"],
        ingredients: [
          "1/2 cup Organic steel-cut oats",
          "2 tbsp Freshly ground golden flaxseed",
          "1/2 cup Wild blueberries",
          "20g Raw halves of English walnuts",
          "1 cup Unsweetened oat milk or water",
          "Pinch of ground Ceylon cinnamon",
        ],
        instructions: [
          "Simmer steel-cut oats in oat milk/water for 12-14 minutes until creamy.",
          "Remove from heat and fold in ground flaxseed and cinnamon.",
          "Top with fresh wild blueberries and raw walnut halves.",
        ],
        clinicalBenefit:
          "Oat beta-glucan binds to bile acids in the intestinal tract, significantly lowering circulating LDL cholesterol particle count.",
      },
      {
        id: "hh-l1",
        type: "Lunch",
        title: "Tuscan White Bean & Kale Stew with Olive Oil Drizzle",
        description:
          "Hearty Tuscan stew made with cannellini beans, tender Lacinato dinosaur kale, diced organic Roma tomatoes, rosemary, and finished with unfiltered polyphenol EVOO.",
        prepTime: "25 mins",
        calories: 580,
        protein: 26,
        carbs: 72,
        fats: 20,
        fiber: 18,
        glycemicIndex: "Low",
        superfoodTags: ["Potassium: 1,200mg", "Magnesium", "Lycopene"],
        ingredients: [
          "1.5 cups Cooked organic cannellini beans (rinsed, low-sodium)",
          "2 cups Chopped Lacinato dinosaur kale",
          "1 cup Diced Roma tomatoes in own juice",
          "1/2 Yellow onion and 3 cloves crushed garlic",
          "1 tbsp Extra virgin olive oil",
          "1 tsp Fresh rosemary and thyme",
          "Low-sodium vegetable broth (200ml)",
        ],
        instructions: [
          "Sauté garlic and onions in a touch of olive oil until aromatic.",
          "Add tomatoes, cannellini beans, broth, and fresh herbs; simmer for 15 minutes.",
          "Stir in chopped kale and cook for 4 minutes until tender.",
          "Ladle into soup bowl and finish with a rich swirl of cold-pressed EVOO.",
        ],
        clinicalBenefit:
          "Delivers over 1,200mg of bioavailable potassium to counterbalance cellular sodium and relax vascular smooth muscle.",
      },
      {
        id: "hh-d1",
        type: "Dinner",
        title: "Grilled Mediterranean Sea Bass with Roasted Beets & Asparagus",
        description:
          "Crispy-skin Mediterranean Sea Bass fillet over roasted balsamic golden beets, steamed lemon asparagus, and a side of wild rice pilaf.",
        prepTime: "25 mins",
        calories: 620,
        protein: 46,
        carbs: 48,
        fats: 24,
        fiber: 9,
        glycemicIndex: "Low",
        superfoodTags: ["Dietary Nitrates", "Omega-3", "Endothelial Defense"],
        ingredients: [
          "200g Wild Mediterranean Sea Bass (Branzino) fillet",
          "1 cup Roasted beets cut into wedges",
          "8 Steamed asparagus spears with lemon zest",
          "1/2 cup Cooked Minnesota wild rice",
          "1 tbsp Lemon-oregano dressing (olive oil, lemon juice, dried oregano)",
        ],
        instructions: [
          "Roast beets at 400°F (200°C) until fork-tender (or use pre-steamed beets).",
          "Sear sea bass in a stainless pan with olive oil for 4 minutes skin-side down, flip for 2 minutes.",
          "Steam asparagus spears for 4 minutes.",
          "Serve fish atop wild rice, accompanied by vibrant roasted beets and asparagus.",
        ],
        clinicalBenefit:
          "Roasted beets provide high concentrations of dietary inorganic nitrates, which the oral microbiome converts to nitric oxide for arterial dilation.",
      },
    ],
    recommendedFoods: [
      {
        food: "Wild Blueberries & Pomegranate Seeds",
        benefitOrHarm: "Packed with anthocyanins and punicalagins that protect endothelial cells from oxidative lipid peroxidation.",
        category: "Fruits",
      },
      {
        food: "Garlic (Crushed raw or lightly cooked)",
        benefitOrHarm: "Allicin produces S-allylcysteine, proven to lower systemic arterial blood pressure by 5-8 mmHg.",
        category: "Allium",
      },
      {
        food: "Organic Beets & Beetroot Greens",
        benefitOrHarm: "High dietary inorganic nitrates directly synthesize nitric oxide for vascular vasodilation.",
        category: "Vegetables",
      },
      {
        food: "Raw Unsalted English Walnuts",
        benefitOrHarm: "Highest concentration of plant alpha-linolenic acid (ALA) among tree nuts; enhances arterial compliance.",
        category: "Nuts",
      },
    ],
    restrictedFoods: [
      {
        food: "Cured & Smoked Meats (Bacon, Salami, Hot Dogs)",
        benefitOrHarm: "Excess sodium and nitrates/nitrites generate harmful Trimethylamine N-oxide (TMAO) in arterial walls.",
        category: "Processed Meats",
      },
      {
        food: "High-Sodium Canned Soups & Commercial Bouillon",
        benefitOrHarm: "Massive sodium spikes disrupt kidney fluid balance and acutely elevate systolic blood pressure.",
        category: "High Sodium",
      },
      {
        food: "Partially Hydrogenated Oils & Margarine",
        benefitOrHarm: "Trans-fats lower protective HDL cholesterol while elevating atherogenic small dense LDL particles.",
        category: "Trans Fats",
      },
      {
        food: "Heavy Alcohol (> 1 drink daily)",
        benefitOrHarm: "Chronic alcohol stimulates the sympathetic nervous system and induces cardiac myocyte hypertrophy.",
        category: "Alcohol",
      },
    ],
    clinicalTips: [
      "Keep sodium intake below 1,500mg daily by swapping commercial table salt for fresh herbs, lemon juice, and potassium-rich kelp flakes.",
      "Allow crushed garlic to rest for 10 minutes before cooking to maximize the formation of bioactive allicin.",
      "Practice 5 minutes of resonant slow breathing (4.5 to 6 breaths per minute) before dinner to activate the parasympathetic vagal nerve.",
    ],
  },

  fitness: {
    id: "fitness",
    name: "Athletic Performance & Lean Longevity",
    subtitle: "High-Protein Mitochondrial Fuel & Rapid Muscle Recovery",
    clinicalTarget: "Target: Protein 2.0g/kg • Leucine > 3g per meal • Glycogen Repletion",
    badge: "Peak Performance",
    overview:
      "Optimized for high physical exertion, lean muscle protein synthesis (MPS), optimal VO2 max endurance, and mitochondrial ATP regeneration. Balances clean complex carbs with high biological value amino acids.",
    baseCalories: 2350,
    targetMacros: {
      proteinPct: 35,
      carbsPct: 40,
      fatsPct: 25,
    },
    meals: [
      {
        id: "fit-b1",
        type: "Breakfast",
        title: "Anabolic Egg White & Turkey Scramble with Sweet Potato Hash",
        description:
          "High-leucine scramble made with 4 organic egg whites and 2 whole eggs, seasoned lean turkey breast, diced skillet sweet potato hash, and baby spinach.",
        prepTime: "15 mins",
        calories: 540,
        protein: 48,
        carbs: 46,
        fats: 16,
        fiber: 8,
        glycemicIndex: "Medium",
        superfoodTags: ["Leucine Trigger", "Slow Glycogen", "Bioavailable Choline"],
        ingredients: [
          "4 Organic egg whites + 2 whole pasture eggs",
          "80g Lean roasted turkey breast, diced",
          "1 cup Diced sweet potato sautéed with paprika and sea salt",
          "1 cup Baby spinach folded into scramble",
          "1/4 Avocado for healthy fat assimilation",
        ],
        instructions: [
          "Dice sweet potato and sauté in a skillet with olive oil until golden and crisp (8-10 mins).",
          "Whisk eggs, egg whites, and turkey breast together with sea salt and black pepper.",
          "Pour egg mixture into skillet, add spinach, and gently scramble until fluffy.",
          "Serve alongside golden sweet potato hash with avocado slices.",
        ],
        clinicalBenefit:
          "Delivers over 3.8g of essential leucine, successfully crossing the mTOR threshold to activate muscle protein synthesis immediately upon waking.",
      },
      {
        id: "fit-l1",
        type: "Lunch",
        title: "Grilled Grass-Fed Flank Steak with Black Rice & Charred Asparagus",
        description:
          "Tender grass-fed flank steak (220g) sliced thin, served with antioxidant-rich Forbidden Black Rice, charred lemon asparagus, and a chimichurri herb sauce.",
        prepTime: "20 mins",
        calories: 780,
        protein: 62,
        carbs: 64,
        fats: 28,
        fiber: 9,
        glycemicIndex: "Low",
        superfoodTags: ["Bioavailable Heme Iron", "Creatine & Carnosine", "Black Rice Anthocyanins"],
        ingredients: [
          "220g Grass-fed beef flank steak",
          "3/4 cup Cooked Forbidden black rice",
          "10 Asparagus spears, charred with sea salt and garlic",
          "2 tbsp Fresh chimichurri (parsley, oregano, garlic, red wine vinegar, olive oil)",
        ],
        instructions: [
          "Season steak with sea salt and coarse black pepper.",
          "Sear in a hot cast-iron skillet for 4 minutes per side for medium-rare.",
          "Rest steak for 5 minutes, then slice across the grain.",
          "Serve over warm black rice with charred asparagus and fresh chimichurri.",
        ],
        clinicalBenefit:
          "Provides natural creatine, bioavailable heme iron for red blood cell oxygenation, and high zinc for natural testosterone support.",
      },
      {
        id: "fit-d1",
        type: "Dinner",
        title: "Wild Yellowfin Tuna Poke Bowl with Edamame & Seaweed Salad",
        description:
          "Sashimi-grade yellowfin tuna cubes marinated in tamari and ginger, atop warm brown jasmine rice, steamed edamame, wakame seaweed salad, and cucumber.",
        prepTime: "15 mins",
        calories: 680,
        protein: 56,
        carbs: 68,
        fats: 18,
        fiber: 10,
        glycemicIndex: "Low",
        superfoodTags: ["Ultra-Lean Protein", "Iodine & Trace Minerals", "Anti-Catabolic"],
        ingredients: [
          "200g Sashimi-grade wild Yellowfin Tuna, cubed",
          "3/4 cup Cooked brown jasmine rice",
          "1/2 cup Steamed shelled edamame beans",
          "1/4 cup Wakame seaweed salad (low-sugar)",
          "1/2 Persian cucumber, sliced thin",
          "1 tbsp Tamari, sesame oil, and freshly grated ginger dressing",
          "1 tsp Toasted sesame seeds",
        ],
        instructions: [
          "Toss tuna cubes with tamari, grated ginger, and a dash of sesame oil.",
          "Assemble bowl with warm brown rice on one side, cucumber slices and edamame on the other.",
          "Place marinated tuna and seaweed salad in the center.",
          "Garnish with toasted sesame seeds and crushed nori flakes.",
        ],
        clinicalBenefit:
          "Combines marine omega-3s with plant isoflavones to suppress post-training DOMS (delayed onset muscle soreness) and replenish glycogen.",
      },
    ],
    recommendedFoods: [
      {
        food: "Pasture-Raised Whole Eggs & Egg Whites",
        benefitOrHarm: "Perfect amino acid score (PDCAAS 1.0) with high choline for neuromuscular transmission.",
        category: "Proteins",
      },
      {
        food: "Forbidden Black Rice & Sweet Potatoes",
        benefitOrHarm: "Complex carbohydrate sources loaded with anthocyanins and beta-carotene for clean sustained muscle glycogen.",
        category: "Performance Carbs",
      },
      {
        food: "Tart Cherry Juice (Montmorency)",
        benefitOrHarm: "Clinically proven to reduce post-workout muscle soreness and accelerate recovery via COX-2 inhibition.",
        category: "Recovery Superfoods",
      },
      {
        food: "Wild Sockeye Salmon & Grass-Fed Beef",
        benefitOrHarm: "Natural sources of dietary creatine, carnosine, and bioavailable heme iron for VO2 max endurance.",
        category: "Proteins",
      },
    ],
    restrictedFoods: [
      {
        food: "Alcohol (especially post-workout)",
        benefitOrHarm: "Suppresses muscle protein synthesis via mTOR inhibition by up to 37% and impairs rehydration.",
        category: "Alcohol",
      },
      {
        food: "Ultra-Processed Fast Foods & Deep Fried Items",
        benefitOrHarm: "Causes arterial endothelial dysfunction and promotes prolonged systemic oxidative stress.",
        category: "Ultra-Processed",
      },
      {
        food: "High-Sugar Refined Cereals & Pastries",
        benefitOrHarm: "Triggers reactive hypoglycemia (energy crash) during training sessions.",
        category: "Refined Sugars",
      },
      {
        food: "Commercial Protein Bars Loaded with High Maltitol/Sucralose",
        benefitOrHarm: "Causes GI distress, bloating, and water retention during high-intensity training.",
        category: "Supplements",
      },
    ],
    clinicalTips: [
      "Consume 30-40g of high-leucine protein within 60 minutes of concluding resistance or high-intensity cardiovascular training.",
      "Add 1/4 tsp of natural Celtic or Himalayan sea salt to your post-workout hydration to accelerate cellular fluid absorption.",
      "Drink 8oz of 100% tart cherry juice 30 minutes before bed on heavy training days to optimize growth hormone release and deep sleep.",
    ],
  },
};
