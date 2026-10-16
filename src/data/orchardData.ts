import { HeritageTree, PhenologyMilestone, FieldUpdate, DeliveryFlush, FaqItem } from '../types';

export const ESTATE_IMAGES = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCgBnyXvPc5kumuwXuJ4ADKUsdFxxPzMFsWe2gqNILTALbjNtg_4locE6RCim9cEUh-GZFlVPqUv35i4hlzVP9KonLY6LDHBGyidNAIkQMAHIXiwVZ-8M06ND7C75kPhobQJtxLg-N-42DsCpaI4KzN0AWmPYMAsanlrwtbV2tqoUEpxtlMtT0cxBdC_-YK1oWl3mVZZ-Sb34uGhXTYdeJQBC4jwjlxGlQzZAOmW1t9kQaxPy6scdjwg-4fxUpsOAQ5NQ',
  footerLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBE_h66SGn7uAM2QpHrdb9UPnS8TYP-kQO3WjRS8pCG1EbO73Q_D87iKZwh4k7ZEBA7pI-jGULNkMNSiHTI0gkOxe5i91jtbFuEZ4XJLFOm3MysU0XLJAe5UxvmO5UIHryPmbAMyO07OKfXJd70xX0BIvzfGC6ZPp71j7oZTts1zFqoDfgdWoKpkemGgKOlGwLMk0Sy3kVT-Auqz45LLBpxBqnT3Idqs5FzgvaDWT_El16unE6crlLIBcCaxkf84P4VYhw',
  treeHero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3xZV71DRAp8G6x1Sgw8QPzGfrDSZsRwUxNV097INday9eA3MX5mGcA27vOIu8C0iBr53kusB4R1JGbUb_NZjf8de4IhEVOdiypgY5usRJWzuV7b98Wf70EmLgy-zAKfRgf5hxW-bu_xB36LAsD2VijpGaiXFKEbSmilj6s7GFD88tAjWn-HoNuRDAeUHIkOYztnEXhIXoAKd-kmW1r7BdP24GvvV5XqwV9wVGtKG8KNhC_hMJ8bmrTA',
  mangoMacro: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBOFRj1m5RY6kyCd3XVT2WJME6W5CZPWVoZ3MEg1Wo3WGO0zzv9j6zvfLbenm15PBEXqF8s-dWGMXrD9h5oVdwfLgSXf63buLRGI9eAoUMsftqpHHwuPP_RlmyKD3CINIPiC58_qm0zZ4em6e7gJMNcTNNw8enMjw9-RHDXHRkktp6a4FdEnBGxP53OzexqouwZpaSwPyOaQXMyje9cs0Qn-NWoyW6mvoez2wLP7BZYFSDKxrGq1O7CA',
};

export const HERITAGE_TREES: HeritageTree[] = [
  {
    id: 'tree-104',
    plotNumber: 'ESTATE PLOT #14',
    treeCode: 'KESHAR-1948 · TREE-104',
    ageYears: 38,
    location: 'Gothangaon Farm East Bank',
    soilType: 'Basaltic Clay & River Loam',
    soilPh: 'pH 7.4',
    avgBrixRating: 21.2,
    expectedHarvestKg: 50,
    status: 'Available',
    image: ESTATE_IMAGES.treeHero,
    phenologyStatus: 'March: Fruit Set (Pea-Size)',
    story: 'Planted along the natural seasonal rivulet across Gothangaon Farm. Renowned for generating remarkably dense saffron pulp with concentrated honey fragrance.'
  },
  {
    id: 'tree-088',
    plotNumber: 'ESTATE PLOT #09',
    treeCode: 'KESHAR-1936 · TREE-088',
    ageYears: 52,
    location: 'Ancient South Slope, Gothangaon Farm',
    soilType: 'Deep Basaltic Mineral Loam',
    soilPh: 'pH 7.2',
    avgBrixRating: 22.4,
    expectedHarvestKg: 50,
    status: 'Available',
    image: ESTATE_IMAGES.treeHero,
    phenologyStatus: 'March: Fruit Set (Pea-Size)',
    story: 'One of the elder patriarch trees on the south-facing slope receiving 10+ hours of continuous daily sunshine, consistently logging high Brix sweetness over 22°.'
  },
  {
    id: 'tree-142',
    plotNumber: 'ESTATE PLOT #22',
    treeCode: 'KESHAR-1925 · TREE-142',
    ageYears: 64,
    location: 'Gothangaon Farm Ridge',
    soilType: 'Iron-Rich Volcanic Alluvium',
    soilPh: 'pH 7.5',
    avgBrixRating: 20.9,
    expectedHarvestKg: 50,
    status: 'Available',
    image: ESTATE_IMAGES.treeHero,
    phenologyStatus: 'March: Fruit Set (Pea-Size)',
    story: 'Rooted 6 meters deep into volcanic strata near natural scenic boundaries. Produces large, uniformly oblong Keshar fruits with an exquisite saffron-yellow blush.'
  },
  {
    id: 'tree-047',
    plotNumber: 'ESTATE PLOT #06',
    treeCode: 'KESHAR-1955 · TREE-047',
    ageYears: 42,
    location: 'Central Meadow Pavilion, Gothangaon Farm',
    soilType: 'Organic Humus & Basalt Soil',
    soilPh: 'pH 7.3',
    avgBrixRating: 21.8,
    expectedHarvestKg: 50,
    status: 'Available',
    image: ESTATE_IMAGES.treeHero,
    phenologyStatus: 'March: Fruit Set (Pea-Size)',
    story: 'Positioned close to our natural open-air hay curing pavilion. Nourished exclusively with indigenous organic cow manure and fermented botanical neem decoctions.'
  }
];

export const PHENOLOGY_TIMELINE: PhenologyMilestone[] = [
  {
    stageNumber: 1,
    title: 'Winter Dormancy & Soil Root Nourishment',
    timeline: 'Nov – Dec 2024',
    status: 'completed',
    description: 'Root perimeter trenching with organic cow manure, mustard cake, and natural bio-fertilizers. Deep winter rest period.',
    agronomistNote: 'Root respiration optimal. Basalt soil moisture balanced following post-monsoon clearing.'
  },
  {
    stageNumber: 2,
    title: 'Full Saffron Inflorescence & Natural Pollination',
    timeline: 'Jan – Feb 2025',
    status: 'completed',
    description: 'Golden blossom panicles blanket the entire canopy. Pollination driven naturally by local farm bee colonies without artificial foliar chemicals.',
    agronomistNote: 'Exceptional blossom density recorded. Zero synthetic insecticides; sprayed with cold-pressed neem oils.'
  },
  {
    stageNumber: 3,
    title: 'Fruit Set & Hand Thinning (Pea to Marble Size)',
    timeline: 'March 2025 (Current)',
    status: 'current',
    description: 'Baby mangoes form. Expert farm hands selectively prune weaker clusters, concentrating tree vitality into the finest 150-180 select fruits.',
    agronomistNote: 'Fruit set count on Plot #14 & #09 is vigorous. Pea-to-marble stage measuring 14-22mm diameter.',
    fruitSizeMm: 18,
    brixLevel: '6.5° (Early acid-starch phase)'
  },
  {
    stageNumber: 4,
    title: 'Canopy Maturation & Sunshine Sugar Accumulation',
    timeline: 'April 2025',
    status: 'upcoming',
    description: '110 days of blazing sunshine convert starches into pure natural fructose. Fruits develop the iconic curved parrot beak silhouette.',
    agronomistNote: 'Expected Brix surge from 12° to 19°+ during the final 3 weeks of warm dry climate at Gothangaon Farm.'
  },
  {
    stageNumber: 5,
    title: '3-Flush Harvest & Traditional Hay-Curing',
    timeline: 'May – June 2025',
    status: 'upcoming',
    description: 'Morning hand-plucking with 1cm stems intact to prevent sap burn. Natural open-air ripening inside indigenous grass pavilions.',
    agronomistNote: 'Staggered over 3 batches to deliver peak eating maturity in batches straight to patron doorsteps.'
  }
];

export const FIELD_UPDATES: FieldUpdate[] = [
  {
    id: 'update-03',
    date: 'March 14, 2025',
    stage: 'Phenology Stage 03: Selective Cluster Thinning',
    title: 'Pea-to-Marble Fruit Formation Across Plot #14 & #09',
    notes: 'Following the cool February nights, fruit clusters have set solidly. Our agrology team has commenced manual thinning to guarantee large fruit sizes (260g - 320g average). Soil pH tests read a balanced 7.4. All brass identification plates have been cleaned and verified.',
    agronomistName: 'Jayeshbhai Patel (Chief Agrologist, Aapla Zhad Gothangaon Farm)',
    image: ESTATE_IMAGES.treeHero,
    sugarBrix: '7.2° Brix'
  },
  {
    id: 'update-02',
    date: 'February 18, 2025',
    stage: 'Phenology Stage 02: Golden Blossom Flush',
    title: 'Full Canopy Inflorescence Under Bright Sun',
    notes: 'The farm was in full golden blossom. Wild honeybee activity was at its peak during early dawn hours. Natural neem and cow urine spray was misted at dusk to protect blossoms from morning dew fungal stress.',
    agronomistName: 'Jayeshbhai Patel',
    image: ESTATE_IMAGES.treeHero
  },
  {
    id: 'update-01',
    date: 'January 10, 2025',
    stage: 'Phenology Stage 01: Soil Mineral Enrichment',
    title: 'Basaltic Loam Soil Aeration & Bio-Nourishment',
    notes: 'Applied 40 KGs of well-decomposed organic cow manure around each 35+ year tree basin. Water channels leveled to ensure deep root nourishment.',
    agronomistName: 'Dr. Ramesh Virani (Soil Scientist)',
    image: ESTATE_IMAGES.treeHero
  }
];

export const DELIVERY_FLUSHES: DeliveryFlush[] = [
  {
    batchNumber: 'BATCH 01',
    batchCode: 'FLUSH-01',
    timeframe: 'Early May (May 05 - May 10)',
    weightKgRange: '16 - 18 KGs',
    quantityDozens: '4 - 5 Dozens (~48-60 mangoes)',
    flavorProfile: 'First canopy flush. Intensely aromatic with crisp floral honey notes and firm, vibrant saffron flesh.',
    crateCount: '1 Custom Ventilated Wooden Crate',
    status: 'Scheduled'
  },
  {
    batchNumber: 'BATCH 02',
    batchCode: 'FLUSH-02',
    timeframe: 'Mid May (May 18 - May 24)',
    weightKgRange: '16 - 18 KGs',
    quantityDozens: '4 - 5 Dozens (~48-60 mangoes)',
    flavorProfile: 'Peak mid-season harvest. Deep saffron pulp with high natural Brix sweetness (20°-22°) and rich melting texture.',
    crateCount: '1 Custom Ventilated Wooden Crate',
    status: 'Scheduled'
  },
  {
    batchNumber: 'BATCH 03',
    batchCode: 'FLUSH-03',
    timeframe: 'Early June (June 02 - June 08)',
    weightKgRange: '14 - 16 KGs',
    quantityDozens: '3 - 4 Dozens (~36-48 mangoes)',
    flavorProfile: 'Final canopy maturation. Velvety, concentrated dessert profile with subtle citrus-floral complexity.',
    crateCount: '1 Custom Ventilated Wooden Crate',
    status: 'Scheduled'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'Provenance',
    question: 'What makes Keshar different from Alphonso or commercial mangoes?',
    answer: 'Keshar (GI Tag #124) is famed as the "Queen of Mangoes", renowned for its radiant saffron-orange pulp, exceptional sugar-brix levels (19° to 22°), and completely stringless fibre-free texture. Unlike Alphonso which has a richer butter profile, Keshar offers a bright honeyed floral sweetness that perfume an entire room. Our trees at Gothangaon Farm are nurtured in iron-rich basaltic clay and receive 110 continuous days of sunshine.'
  },
  {
    category: 'Purity Guarantee',
    question: 'How do you guarantee 100% zero-chemical purity and no artificial ripening?',
    answer: 'Commercial markets commonly use banned calcium carbide or ethylene gas rooms to artificially yellow fruits overnight, causing chemical taste and acid burns. At Aapla Zhad, fruits are left to physiologically ripen on the tree limbs until fully mature, hand-plucked with stems intact, and slow-cured in shaded open-air pavilions on beds of dry local grass for 5 to 7 days before packing.'
  },
  {
    category: 'Harvest & Delivery',
    question: 'Why is the 50 KG harvest split into 3 separate deliveries?',
    answer: 'A healthy heritage mango tree produces its yield over a 4 to 5-week biological ripening arc. Delivering all 50 kilograms at once would lead to spoilage. Staggering into 3 timed wooden crates across May and June ensures that your family enjoys fresh, tree-ripened fruit at peak sweetness throughout the entire summer season.'
  },
  {
    category: 'Harvest & Delivery',
    question: 'Which cities do you deliver to and how is transit insured?',
    answer: 'We provide complimentary insured air cargo dispatch directly to your doorstep in Mumbai, Delhi NCR, Bangalore, Pune, Ahmedabad, and Hyderabad. Mangoes are packed in traditional ventilated wooden crates with natural dry grass cushions to prevent bruising. In the rare event of transit damage, replacement crates are dispatched immediately.'
  },
  {
    category: 'Farm Visits',
    question: 'Can I visit my rented tree at Gothangaon Farm?',
    answer: 'Yes! All tree patrons and their immediate families are warmly welcomed to visit their designated tree at Gothangaon Farm during the flowering season (Jan-Feb) or harvest season (May). Please notify our Estate Protocol Desk 7 days in advance to arrange farm access, Chief Agrologist walkthroughs, and tasting sessions.'
  },
  {
    category: 'Provenance',
    question: 'Can I rent a tree as a wedding or corporate gift?',
    answer: 'Absolutely. Over 35% of our 2024 patrons gifted trees. We engrave the recipient family name and your personal dedication on a vintage brass plaque affixed to the tree, mail a physical sealed brass certificate of provenance in a velvet presentation folio, and dispatch all 3 harvest crates to the recipient address.'
  }
];
