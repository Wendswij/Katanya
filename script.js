(() => {
const $ = s => document.querySelector(s);
const now = () => performance.now();
function R(seed) { let s = (seed * 9301 + 49297) % 233280; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280 } }
const fmt = n => n >= 1e6 ? (n / 1e6).toFixed(1).replace('.0', '') + 'M' : n >= 1e3 ? (n / 1e3).toFixed(1).replace('.0', '') + 'K' : String(n);
const dur = ms => { const s = Math.round(ms / 1000); return Math.floor(s / 60) + 'm ' + String(s % 60).padStart(2, '0') + 's' };
const rand = (a, b) => a + Math.random() * (b - a);

const svg = (inner, defs = '') => `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${defs ? `<defs>${defs}</defs>` : ''}${inner}</svg>`;
    const SC = {
        sunset: i => svg(`<rect width="400" height="300" fill="url(#su${i})"/><circle cx="200" cy="208" r="50" fill="#ffe2a0"/><path d="M0 222h400v78H0z" fill="#2b1d35"/><path d="M60 222v-46h6v46zM290 222v-30l34-16 34 16v30z" fill="#2b1d35"/><path d="M63 176l-16-11M63 176l16-11" stroke="#2b1d35" stroke-width="3"/><text class="hid" x="235" y="104" font-size="10" fill="#fff">its not actually</text>`,
            `<linearGradient id="su${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2c6e"/><stop offset=".58" stop-color="#f2735a"/><stop offset="1" stop-color="#ffc56e"/></linearGradient>`),
        dog: i => svg(`<rect width="400" height="300" fill="#bfe3ff"/><circle cx="330" cy="60" r="26" fill="#fff6c8"/><rect y="200" width="400" height="100" fill="#7cc36b"/>
        <path d="M102 196q-26-30-6-46" stroke="#b97c45" stroke-width="10" fill="none" stroke-linecap="round"/><ellipse cx="160" cy="200" rx="64" ry="34" fill="#c98b52"/><rect x="112" y="214" width="14" height="36" rx="6" fill="#b97c45"/><rect x="190" y="214" width="14" height="36" rx="6" fill="#b97c45"/><rect x="140" y="218" width="13" height="32" rx="6" fill="#c98b52"/><rect x="170" y="218" width="13" height="32" rx="6" fill="#c98b52"/>
        <circle cx="236" cy="166" r="34" fill="#d39a62"/><ellipse cx="216" cy="146" rx="12" ry="22" fill="#9a6232" transform="rotate(-20 216 146)"/><ellipse cx="262" cy="178" rx="16" ry="11" fill="#f0c99a"/><circle cx="272" cy="172" r="5" fill="#222"/><circle cx="244" cy="158" r="5" fill="#222"/>
        <ellipse cx="312" cy="238" rx="15" ry="7" fill="#e0a33a" transform="rotate(-25 312 238)"/><text class="hid" x="282" y="262" font-size="9" fill="#2d5a24">I dont have a dog.</text>`),
        city: i => {
            const r = R(7); let w = '';[[20, 120, 60], [86, 70, 70], [162, 140, 54], [222, 96, 80], [308, 60, 74]].forEach(([x, y, wd]) => { w += `<rect x="${x}" y="${y}" width="${wd}" height="${300 - y}" fill="#1c2550"/>`; for (let yy = y + 10; yy < 290; yy += 16)for (let xx = x + 8; xx < x + wd - 8; xx += 13) { if (r() > .55) w += `<rect x="${xx}" y="${yy}" width="7" height="9" fill="#ffd76a" opacity="${(.5 + r() * .5).toFixed(2)}"/>` } });
            return svg(`<rect width="400" height="300" fill="#0d1330"/>${w}<rect x="236" y="128" width="40" height="26" fill="#ffe08a"/><text class="hid" x="238" y="145" font-size="6" fill="#5a4300">im sleepy`)
        },
        beach: i => svg(`<rect width="400" height="300" fill="#9fd8ef"/><rect y="118" width="400" height="80" fill="#2f8fbf"/><path d="M0 190q50-14 100 0t100 0 100 0 100 0v20H0z" fill="#e9f6fb"/><rect y="198" width="400" height="102" fill="#f0d9a6"/><circle cx="90" cy="70" r="30" fill="#fff7d1"/><text class="hid" x="140" y="242" font-size="12" font-style="italic" fill="#8a6b38" transform="rotate(-4 200 240)">played on my phone the whole time</text>`),
        forest: i => svg(`<rect width="400" height="300" fill="url(#fo${i})"/>${[30, 95, 170, 250, 330].map((x, k) => `<rect x="${x}" y="0" width="${26 + k % 2 * 12}" height="300" fill="#4b3423" opacity="${.75 + k * .05}"/>`).join('')}<path d="M0 250q100-20 200 0t200 0v50H0z" fill="#2c3a22"/><text class="hid" x="172" y="150" font-size="9" fill="#e8d6bf" transform="rotate(-90 186 150)">I took an uber.</text>`,
            `<linearGradient id="fo${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6f9a6a"/><stop offset="1" stop-color="#26402a"/></linearGradient>`),
        rain: i => {
            const r = R(11); let d = ''; for (let k = 0; k < 60; k++) { d += `<ellipse cx="${(r() * 400).toFixed(0)}" cy="${(r() * 300).toFixed(0)}" rx="${(1.5 + r() * 3).toFixed(1)}" ry="${(3 + r() * 5).toFixed(1)}" fill="#dfe8f1" opacity="${(.2 + r() * .4).toFixed(2)}"/>` }
            return svg(`<rect width="400" height="300" fill="url(#ra${i})"/><circle cx="90" cy="200" r="40" fill="#ffb347" opacity=".25"/><circle cx="300" cy="230" r="55" fill="#ff6f61" opacity=".18"/>${d}<text class="hid" x="150" y="150" font-size="13" fill="#e9eef3">I did stay in</text>`,
                `<linearGradient id="ra${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5b6b7d"/><stop offset="1" stop-color="#232c37"/></linearGradient>`)
        },
        owl: i => svg(`<rect width="400" height="300" fill="#16231f"/><circle cx="330" cy="50" r="22" fill="#e8f0d8" opacity=".8"/><rect x="40" y="226" width="330" height="12" rx="6" fill="#4a3424"/>
        <ellipse cx="200" cy="160" rx="62" ry="74" fill="url(#ow${i})"/><circle cx="176" cy="132" r="20" fill="#fff"/><circle cx="224" cy="132" r="20" fill="#fff"/><circle cx="176" cy="134" r="10" fill="#111"/><circle cx="224" cy="134" r="10" fill="#111"/><path d="M193 150l7 12 7-12z" fill="#f6a800"/>
        ${[172, 200, 228].map(x => `<path d="M${x - 8} 226l4 8M${x} 226v9M${x + 8} 226l-4 8" stroke="#f6a800" stroke-width="4" stroke-linecap="round"/>`).join('')}<ellipse class="hid mark" cx="200" cy="230" rx="50" ry="16" fill="none" stroke="#fff" stroke-width="1"/>`,
            `<linearGradient id="ow${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5d73"/><stop offset=".25" stop-color="#ffb24a"/><stop offset=".45" stop-color="#ffe14d"/><stop offset=".65" stop-color="#55d68f"/><stop offset=".85" stop-color="#4aa3ff"/><stop offset="1" stop-color="#8b6cff"/></linearGradient>`),
        mirror: i => svg(`<rect width="400" height="300" fill="#060606"/><ellipse cx="200" cy="140" rx="46" ry="58" fill="#1b1b1b"/><path d="M110 300q10-80 90-90t90 90z" fill="#1b1b1b"/><text class="hid" x="160" y="276" font-size="10" fill="#aaa">is this you?</text>`),
        glitch: i => {
            const r = R(31); let s = ''; const cs = ['#ff2e63', '#08d9d6', '#fff200', '#252a34', '#eaeaea']; for (let k = 0; k < 26; k++) { s += `<rect x="${(r() * -60).toFixed(0)}" y="${(k * 11.5).toFixed(0)}" width="${(200 + r() * 300).toFixed(0)}" height="${(4 + r() * 10).toFixed(0)}" fill="${cs[k % 5]}" opacity="${(.35 + r() * .6).toFixed(2)}"/>` }
            return svg(`<rect width="400" height="300" fill="#111"/>${s}<text class="hid" x="150" y="160" font-size="13" fill="#fff">bought a new phone to post this.</text>`)
        },
        crowd: i => {
            const r = R(19); let h = ''; for (let k = 0; k < 190; k++) { const y = 150 + r() * 150; h += `<circle cx="${(r() * 400).toFixed(0)}" cy="${y.toFixed(0)}" r="${(4 + y / 60).toFixed(1)}" fill="hsl(${(r() * 40 + 200).toFixed(0)} 15% ${(12 + r() * 20).toFixed(0)}%)"/>` }
            return svg(`<rect width="400" height="300" fill="#8d96a6"/><path d="M80 0l40 150M320 0l-40 150" stroke="#fff6b0" stroke-width="18" opacity=".35"/><rect x="40" y="46" width="170" height="26" fill="#d14d3a" opacity=".55"/><text class="hid" x="46" y="63" font-size="10" fill="#fff">SUMMER SOUND FEST 2016</text>${h}`)
        },
        coffee: i => svg(`<rect width="400" height="300" fill="#7a5238"/><path d="M140 110h120l-12 130h-96z" fill="#f4ede4"/><path d="M260 130q40 0 34 36t-38 30" stroke="#f4ede4" stroke-width="12" fill="none"/><ellipse cx="200" cy="112" rx="60" ry="10" fill="#4a2c1a"/>`),
        plate: i => svg(`<rect width="400" height="300" fill="#f6d365"/><circle cx="200" cy="160" r="96" fill="#fff"/><text x="200" y="185" text-anchor="middle" font-size="76" font-weight="700" fill="#e2483d" font-family="sans-serif">?</text>`),
        brain: i => svg(`<rect width="400" height="300" fill="#1f1b3a"/>${[0, 1, 2, 3, 4].map(k => `<circle cx="${120 + k * 40}" cy="${150 + (k % 2 ? -30 : 30)}" r="${40 + k * 6}" fill="none" stroke="#ff5d73" stroke-width="2" opacity="${.3 + k * .12}"/>`).join('')}<text x="20" y="40" font-size="14" fill="#ff5d73" font-weight="700">⚠ WARNING</text>`),
        stack: i => svg(`<rect width="400" height="300" fill="#e9eef5"/>${[0, 1, 2, 3].map(k => `<rect x="${60 + k * 14}" y="${50 + k * 30}" width="240" height="70" fill="#fff" stroke="#94a3b8"/><rect x="${76 + k * 14}" y="${66 + k * 30}" width="120" height="10" fill="#94a3b8"/>`).join('')}`),
        ballot: i => svg(`<rect width="400" height="300" fill="#1a2f86"/><rect x="100" y="70" width="200" height="170" fill="#fff"/><text x="200" y="168" text-anchor="middle" font-size="64" font-weight="800" fill="#1a2f86" font-family="sans-serif">80%</text><text class="hid" x="200" y="210" text-anchor="middle" font-size="10" fill="#555">n = 10</text>`),
        play: i => svg(`<rect width="400" height="300" fill="#222"/><circle cx="200" cy="150" r="44" fill="rgba(255,255,255,.85)"/><path d="M188 128l32 22-32 22z" fill="#222"/><rect x="20" y="268" width="360" height="5" fill="#555"/><rect x="20" y="268" width="40" height="5" fill="#e8251c"/><text x="370" y="258" text-anchor="end" font-size="11" fill="#ddd">11:02</text><text x="40" y="60" font-size="34" fill="#fff200" font-weight="800" font-family="sans-serif">OMG</text>`),
        chart: i => svg(`<rect width="400" height="300" fill="#fff"/><path d="M50 30v220h330" stroke="#1c1b18" stroke-width="2" fill="none"/><path d="M50 60C120 70 140 150 200 190s120 50 180 55" stroke="#e8251c" stroke-width="5" fill="none"/><text x="58" y="44" font-size="12" fill="#1c1b18">productivity</text><text x="378" y="270" font-size="12" fill="#1c1b18" text-anchor="end">hours "just checking" →</text><text class="hid" x="58" y="290" font-size="9" fill="#555">y-axis not to scale. neither is your day.</text>`)
    };

    const P = (n, h, c, v) => ({ n, h, c, v });
    const U = {
        mossy: P('mossy toast', 'mossy_toast', 95), dani: P('Dani', 'danidaydreams', 280), theo: P('Theo', 'theoonroofs', 20), cat: P('Daily Cat Facts', 'catfactsdaily', 40, 1), buzz: P('DailyBuzz', 'dailybuzz', 350, 1), owl2: P('2am', 'nightowl_', 240), takes: P('tepid takes', 'tepidtakes', 10), biscuit: P('Biscuit', 'biscuitthedog', 30), soft: P('gentle', 'softreminders', 180), void: P('void memes', 'voidmemes', 300), local: P('LocalWire', 'localwire', 210, 1), jules: P('jules', 'julesisoffline', 330), ana: P('Ana', 'ana.after.dark', 230), sci: P('SciWire', 'sciwiretoday', 190, 1), kai: P('Kai', 'glowwithkai', 320, 1), priya: P('Priya', 'priyaoutside', 170), qotd: P('QOTD', 'question_of_the_day', 60), trend: P('TrendFeed', 'trendfeed', 15, 1), sleep: P('Sleep Truths', 'sleeptruthz', 260, 1), sam: P('Sam', 'samwalks', 120), viral: P('ViralNow', 'viralnow24', 0, 1), lena: P('Lena', 'lenalogsoff', 200), rita: P('Rita', 'ritaonbikes', 340), mo: P('mo', 'mo_in_the_rain', 210), pollz: P('PollPulse', 'pollpulse', 90, 1), feed: P('katanya', 'katanya', 220, 1), kid: P('tomas', 'tomas_lol', 60),
        lumen: P('Lumen Glow', 'lumenglow', 200), focus: P('FocusFlow', 'focusflow', 150), deals: P('MegaDealz', 'megadealz', 5), brain: P('BrainPop', 'brainpop', 50), nimbus: P('Nimbus Cloud', 'nimbus', 220), more: P('MORE', 'getmore', 280), cart: P('ShopNow', 'shopnow', 30), plus: P('feed+', 'feedplus', 220)
    };
    const FRAGS = ['THE FEED', 'NEVER ENDS.', 'YOUR', 'ATTENTION', 'DOES.', 'SPEND IT', 'LIKE IT', 'MATTERS.'];
    const AD = (u, text, a, b, big, sub, dom, cta, fine, secret) => { const o = { u, ad: 1, text, media: { a, b, big, sub, dom, cta }, fine }; if (secret) o.secret = secret; return o };
    const CARDS = [
        { u: U.mossy, t: '2m', text: 'good morning to everyone except my alarm clock' },
        {
            u: U.dani, t: '6m', text: 'opening the app for "one second"', media: { k: 'two', c1: '#3d5afe', c2: '#c51162', a: 'me, opening the app', A: '9:02 AM', b: 'me, "one second" later', B: '11:47 AM<span class="hid" style="display:block;font-size:9px;font-family:var(--f-mono);margin-top:6px">how long have you been here?</span>' },
            secret: { kind: 'hidden', title: 'There was small text in that post.', body: s => `It asked how long you've been here. You opened the feed ${dur(s.elapsed)} ago. Did that feel longer or shorter?` }
        },
        { u: U.theo, t: '11m', text: 'caught the sunset from the roof tonight. no filter', media: { k: 'scene', sc: 'sunset' }, secret: { kind: 'frag', frag: 0 } },
        { u: U.cat, t: '14m', text: 'Cats spend about 70% of their lives asleep. Honestly? Goals.' },
        {
            u: U.buzz, t: '18m', text: 'This is huge ☕️👇', media: { k: 'link', sc: 'coffee', src: 'dailybuzz.net', head: 'Study: Coffee Drinkers Live 10 Years Longer' }, ctx: 1,
            secret: { kind: 'context', title: '212 people. One coffee company.', body: 'The study surveyed 212 adults, was funded by a coffee brand, and found a correlation, not a cause. The "10 years" figure doesn\'t appear in the study at all.' }
        },
        { u: U.owl2, t: '21m', media: { k: 'meme', bg: '#263238', top: 'nobody:', bot: 'me at 2am: reading about octopus hearts (they have three)', mid: '🐙' } },
        { u: U.takes, t: '25m', text: 'settling this once and for all. pineapple on pizza?', poll: [['Yes, obviously', 52], ['Absolutely not', 48]], pollNote: '18,204 votes · final results' },
        { u: U.biscuit, t: '31m', text: 'he saw a leaf. he has not recovered.', media: { k: 'scene', sc: 'dog' }, secret: { kind: 'frag', frag: 1 } },
        AD(U.lumen, 'Struggling to sleep? Thousands wake up rested.*', '#1e3a8a', '#7c3aed', 'Sleep deeper tonight', 'The calming night light that changes everything.', 'lumenglow.co', 'Shop now', '*In trials, improvement was seen only in participants who also stopped using their phone one hour before bed.',
            { kind: 'hidden', title: 'The fine print did the work.', body: 'The ad\'s own footnote says the better sleep came from putting the phone down. The night light was just along for the ride.' }),
        { u: U.soft, t: '38m', text: 'reminder to drink some water and unclench your jaw' },
        {
            u: U.void, t: '44m', media: { k: 'buttons', a: 'Read the full article', b: 'Read the headline and form a strong opinion', cap: 'every day, the same choice' },
            secret: { kind: 'question', title: 'When did you last read past a headline?', body: 'One study of shared links found that 59% had never been clicked by the person sharing them. The headline was the whole story.' }
        },
        {
            u: U.local, t: '49m', text: 'BREAKING 🚨', media: { k: 'link', sc: 'stack', src: 'localwire.com', head: 'Local Man Wins Lottery Twice in One Week', date: '<span class="hid" style="font-size:11px">Published Mar 14, 2019</span>' }, ctx: 1,
            secret: { kind: 'context', title: 'This "breaking" story is seven years old.', body: 'It was first published in March 2019 and has resurfaced eleven times since, labeled "breaking" each time. Old surprises still get clicks.' }
        },
        { u: U.jules, t: '52m', text: 'my weekly screen time report just called me out by name', media: { k: 'widget' } },
        { u: U.ana, t: '58m', text: 'city never sleeps and neither do I', media: { k: 'scene', sc: 'city' }, secret: { kind: 'frag', frag: 2 } },
        AD(U.focus, 'Can\'t focus? Get your attention span back in 30 days.', '#047857', '#10b981', 'Focus. Finally.', 'Rated #1 by people who downloaded it.', 'focusflow.app', 'Download', 'Free trial auto-renews at $14.99/mo. FocusFlow sends up to 14 reminder notifications daily.',
            { kind: 'hidden', title: 'An app to fix your focus, with 14 notifications a day.', body: 'The cure is selling the problem back to you. The detail sat in the smallest text on the ad.' }),
        {
            u: U.sci, t: '1h', text: 'Well, this explains a lot.', media: { k: 'link', sc: 'brain', src: 'sciwiretoday.com', head: 'Scientists: Goldfish Now Have Longer Attention Spans Than Humans' }, ctx: 1,
            secret: { kind: 'context', title: 'The goldfish stat has no clear source.', body: 'The "8-second attention span" figure traces back to a 2015 marketing report. Researchers have never found an original study behind it. Attention depends on the task, not a single number.' }
        },
        { u: U.owl2, t: '1h', media: { k: 'meme', bg: '#4527a0', top: 'my brain at 3am', bot: 'remember that thing you said in 2014?', mid: '🧠' } },
        {
            u: U.kai, t: '1h', text: 'not sponsored but this serum literally changed my skin ✨ link in bio', media: { k: 'scene', sc: 'stack' },
            tags: '#glow #skincare #selfcare #routine #glassskin #morning #nofilter #honestreview #dewy #love #grwm #favorites #musthave <span class="hid">#ad</span>',
            secret: { kind: 'hidden', title: 'The disclosure was the 14th hashtag.', body: '"Not sponsored" in the caption. "#ad" at the very end, in the smallest text on the post.' }
        },
        { u: U.priya, t: '1h', text: 'the ocean doesn\'t have notifications', media: { k: 'scene', sc: 'beach' }, secret: { kind: 'frag', frag: 3 } },
        {
            u: U.qotd, t: '1h', text: 'What would you do with 2 extra hours every day?', big: 1,
            secret: { kind: 'question', title: 'You might already have them.', body: s => `You've spent ${dur(s.elapsed)} here across ${s.seen} posts. Surveys put the average person's daily social media time at around two hours and twenty minutes.` }
        },
        AD(U.deals, 'FLASH SALE. Everything must go!!', '#dc2626', '#f59e0b', '70% off', 'Ends in <span class="cd" data-s="299">04:59</span>', 'megadealz.shop', 'Grab it', 'Countdown restarts each time the page is loaded.',
            { kind: 'hidden', title: 'The timer resets every time you look.', body: 'The sense of urgency is manufactured. Reload the page and the sale "ends" in 4:59 again.' }),
        {
            u: U.trend, t: '2h', text: 'You\'ve probably eaten this today 😳', media: { k: 'link', sc: 'plate', src: 'trendfeed.co', head: 'Celebrity Chef Reveals The One Food You Should Never Eat' }, ctx: 1,
            secret: { kind: 'context', title: 'The article never names the food.', body: '2,400 words, 31 ad slots and a slideshow. The "one food" is never mentioned. The headline was the product.' }
        },
        { u: U.void, t: '2h', media: { k: 'two', c1: '#00897b', c2: '#6d4c41', a: 'me', A: 'I\'ll stop at the next post', b: 'the next post', B: '↓' } },
        {
            u: U.sleep, t: '2h', text: '🧵 1/27 Everything you\'ve been told about sleep is WRONG. Doctors don\'t want you to know this. <button class="showmore" data-more>Show more</button><span class="rest"> 2/ Your body clock is a myth. 3/ Blue light is good for you. 4/ Eight hours was invented by mattress companies.</span>',
            extra: '<div class="fine hid" style="font-size:10px">Account created October 2026 · 41.2K followers</div>',
            secret: { kind: 'context', title: 'Joined 3 days ago. 41,000 followers.', body: 'A brand-new account, a huge overnight following, and "doctors don\'t want you to know." None of that proves it\'s false. None of it proves it\'s true either. Would you have checked?' }
        },
        { u: U.sam, t: '2h', text: 'took the long way home today', media: { k: 'scene', sc: 'forest' }, secret: { kind: 'frag', frag: 4 } },
        AD(U.brain, 'Only geniuses get this right. 99% FAIL', '#7c2d12', '#ea580c', '<span class="puzzle">3+3×3=?</span>', 'Comment your answer!', 'brainpop.games', 'Play now', '',
            { kind: 'question', title: 'What were you looking for when you opened this?', body: 'Try to remember the reason. If there wasn\'t one, that\'s worth noticing too.' }),
        {
            u: U.viral, t: '3h', text: '🚨 Chaos right now. Share before this gets taken down.', media: { k: 'link', sc: 'crowd', src: 'viralnow24.net', head: 'Video Shows Massive Crowd Storming City Center' }, ctx: 1,
            secret: { kind: 'context', title: 'That crowd is a music festival.', body: 'The footage is from a 2016 festival in another country. The banner is in the top left of the frame the whole time.' }
        },
        { u: U.lena, t: '3h', text: 'unsubscribed from 140 newsletters and now my inbox feels like a spa' },
        {
            u: U.void, t: '3h', text: 'graph of my productivity vs. hours spent "just checking"', media: { k: 'scene', sc: 'chart' },
            secret: { kind: 'hidden', title: 'Nobody reads the axis labels.', body: 'Scales, sources and footnotes are the first details people skip on a chart, which is why misleading charts work so well.' }
        },
        {
            u: U.rita, t: '3h', text: 'hey, are you okay? haven\'t heard from you in a while 💛',
            secret: { kind: 'question', title: 'When did you last reply to someone, not something?', body: 'Not a like, not a reaction. A real reply to a real person.' }
        },
        { u: U.mo, t: '4h', text: 'rainy day. staying in.', media: { k: 'scene', sc: 'rain' }, secret: { kind: 'frag', frag: 5 } },
        AD(U.nimbus, 'Never lose a memory again.', '#0369a1', '#38bdf8', 'Save everything', 'Every photo. Every video. Forever.', 'nimbus.cloud', 'Start free', '',
            { kind: 'question', title: 'Saving isn\'t the same as seeing.', body: 'Think of your camera roll. How many of those photos have you ever looked at twice?' }),
        {
            u: U.buzz, t: '4h', text: 'Parents need to see this 😡', media: { k: 'link', sc: 'brain', src: 'dailybuzz.net', head: 'Experts Warn: Dangerous New Trend Is Rewiring Teens\' Brains' }, ctx: 1,
            secret: { kind: 'context', title: 'Every generation gets this headline.', body: 'Novels were blamed in the 1800s, radio in the 1930s, comic books and TV in the 1950s. Some worries are fair. The alarm format stays the same.' }
        },
        { u: U.void, t: '4h', media: { k: 'meme', bg: '#5d4037', top: 'POV:', bot: 'you\'ve been "resting your eyes" with your phone for 3 hours', mid: '📱' } },
        AD(U.more, 'You might also like:', '#111827', '#4c1d95', 'more.', '<span class="hid" style="font-size:10px">We sell the space between your thoughts.</span>', 'getmore.app', 'Get more', '',
            { kind: 'hidden', title: 'What\'s actually for sale.', body: 'Free apps earn money from the time you spend inside them. Your attention is the money.' }),
        {
            u: U.viral, t: '5h', text: 'Incredible photo of a rare rainbow owl spotted in Oregon 🦉 nature is amazing', media: { k: 'scene', sc: 'owl' },
            secret: { kind: 'context', title: 'Count the feet.', body: 'The owl has three. The image is AI-generated, and it was shared 80,000 times before anyone counted.' }
        },
        { u: U.kid, t: '5h', text: 'lol' },
        {
            u: U.pollz, t: '5h', text: 'The people have spoken 🗳️', media: { k: 'link', sc: 'ballot', src: 'pollpulse.io', head: 'POLL: 80% Agree This Is The Best App Ever Made' }, ctx: 1,
            secret: { kind: 'context', title: '80% of ten people.', body: 'The poll asked ten users, inside the app, through a pop-up. Eight of them tapped yes.' }
        },
        {
            u: U.feed, t: '5h', text: 'A photo you might like.', media: { k: 'scene', sc: 'mirror' },
            secret: { kind: 'question', title: 'That black rectangle is a mirror.', body: 'When a screen goes dark, you see the person holding it. What does your face look like right now?' }
        },
        AD(U.deals, 'LAST CHANCE. Almost gone.', '#be123c', '#fb7185', 'Only 2 left', '<span class="lookers">3</span> people are looking at this right now', 'megadealz.shop', 'Buy now', 'Viewer counts are illustrative and randomly generated.',
            { kind: 'hidden', title: 'Those "3 people" are a random number.', body: 'The count changes every couple of seconds, whether anyone is there or not.' }),
        { u: U.void, t: '6h', media: { k: 'meme', bg: '#ad1457', top: 'when the group chat goes quiet for 4 minutes', bot: 'is everyone mad at me<span class="hid" style="display:block;font-size:10px;font-family:var(--f-mono);-webkit-text-stroke:0;text-transform:none;margin-top:6px">like it</span>', mid: '😶' }, secret: { kind: 'frag', frag: 6 } },
        { u: U.soft, t: '6h', text: 'breaking: nothing happened today. everything is fine. you\'re allowed to put the phone down.', big: 1 },
        {
            u: U.viral, t: '6h', text: 'WAIT FOR IT 😱😱😱', media: { k: 'link', sc: 'play', src: 'viralnow24.net', head: 'You Won\'t Believe What Happens Next...' }, ctx: 1,
            secret: { kind: 'context', title: 'Nothing happens next.', body: 'The video runs 11 minutes. The moment from the thumbnail appears for less than a second, at 10:42.' }
        },
        { u: U.dani, t: '7h', media: { k: 'two', c1: '#283593', c2: '#000', a: 'me: I\'ll sleep early tonight', A: '10:00 PM', b: 'me:', B: '2:13 AM' } },
        AD(U.cart, 'Your cart is about to expire!', '#0f766e', '#14b8a6', 'Don\'t lose it', '1 item reserved for <span class="cd" data-s="180">03:00</span>', 'shopnow.com', 'Check out', 'Item added automatically based on your browsing.',
            { kind: 'hidden', title: 'You never added anything to a cart.', body: 'The ad invented an item, a reservation, and a deadline. Though it made the pressure to buy come through.' }),
        {
            u: U.feed, t: '7h', text: 'You\'ve seen 45 posts. Quick question: what was the very first one about?', big: 1,
            secret: { kind: 'question', title: 'It was about an alarm clock.', body: 'Most of what we scroll past is gone within seconds. That isn\'t a flaw in you. The feed is built that way.' }
        },
        { u: U.ana, t: '8h', text: 'uh is my screen ok', media: { k: 'scene', sc: 'glitch' }, secret: { kind: 'frag', frag: 7 } },
        {
            u: U.cat, t: '8h', text: 'Cats spend about 70% of their lives asleep. Honestly? Goals.',
            secret: { kind: 'context', title: 'You\'ve seen this exact post before.', body: 'It was post #4, about forty posts ago. Same words, same account. Did it feel familiar?' }
        },
        AD(U.plus, 'Upgrade to feed+. No ads. No breaks. No end.', '#1d4ed8', '#0f172a', 'Scroll without limits', 'Unlimited posts, forever.', 'feed.plus', 'Upgrade', ''),
        { u: U.feed, t: '9h', text: 'This is the last post.<br><span class="hid" style="font-size:12px">there is no last post.</span>', big: 1 }
    ];

    const ini = u => u.n.replace(/[^A-Za-z ]/g, '').trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'IF';
    function media(m, i) {
        switch (m.k) {
            case 'scene': return `<div class="media">${SC[m.sc](i)}</div>`;
            case 'link': return `<div class="media link"><div class="link-img">${SC[m.sc](i)}</div><div class="link-body"><span class="src">${m.src}</span><b>${m.head}</b>${m.date ? `<span class="date">${m.date}</span>` : ''}</div></div>`;
            case 'two': return `<div class="media two"><div class="p" style="--bg:${m.c1}"><span class="cap">${m.a}</span><b>${m.A}</b></div><div class="p" style="--bg:${m.c2}"><span class="cap">${m.b}</span><b>${m.B}</b></div></div>`;
            case 'meme': return `<div class="media meme" style="--bg:${m.bg}"><b>${m.top}</b><span class="mid">${m.mid}</span><b>${m.bot}</b></div>`;
            case 'buttons': return `<div class="media btns"><span class="face">😰</span><div class="row"><span class="bt dim">${m.a}</span><span class="bt">${m.b}</span></div><small>${m.cap}</small></div>`;
            case 'widget': return `<div class="media widget"><div class="st-top"><span>Screen Time</span><span>Last week</span></div><div class="st-num">6h 51m</div><div class="st-sub">Daily average · up 12% from last week</div><div class="st-bars">${[52, 61, 48, 70, 66, 88, 93].map(h => `<i style="height:${h}%"></i>`).join('')}</div></div>`;
        }return ''
    }
    function stickers(i) { if (i < 30) return ''; const r = R(i * 7); const o = [['HOT!', '#e8251c'], ['NEW!', '#1a2f86'], ['LIVE', '#b5179e'], ['FREE', '#39b54a'], ['99+', '#ff8800']]; const n = 1 + Math.floor(r() * ((i - 26) / 9)); let s = ''; for (let k = 0; k < n; k++) { const x = o[Math.floor(r() * o.length)]; s += `<span class="stk" style="--bg:${x[1]};--r:${(r() * 30 - 15).toFixed(0)}deg;top:${(6 + r() * 70).toFixed(0)}%;${r() > .5 ? 'left' : 'right'}:${(2 + r() * 8).toFixed(0)}%">${x[0]}</span>` } return s }
    function card(c, i) {
        if (c.ad) {
            const m = c.media; return `<article class="slot" data-i="${i}"><div class="post ad" style="--a:${m.a};--b:${m.b}">
        <span class="adlabel">Advertisement · ${c.u.n}</span>
        <div class="adhero"><b>${m.big}</b><span>${m.sub}</span>${i % 2 ? '<span class="burst">NEW!</span>' : ''}</div>
        <div class="adtext">${c.text}</div>${c.fine ? `<p class="fine hid">${c.fine}</p>` : ''}
        <div class="adcta"><span>${m.dom}</span><span class="btn">${m.cta} »</span></div></div>${stickers(i)}</article>`
        }
        const r = R(i + 3), v = Math.round((1800 + i * i * 900) * (.6 + r())); const likes = Math.round(v * .03 * (1 + r()));
        const poll = c.poll ? `<div class="poll">${c.poll.map(([l, p]) => `<div class="opt"><i style="width:${p}%"></i><span>${l}</span><span>${p}%</span></div>`).join('')}<small>${c.pollNote}</small></div>` : '';
        return `<article class="slot" data-i="${i}"><div class="post">
        <div class="ph"><span class="pic" style="--h:${c.u.c}">${ini(c.u)}</span><div><span class="un">${c.u.h}</span>${c.u.v ? '<span class="vf">✔</span>' : ''}<span class="when">posted ${c.t} ago</span></div></div>
        ${c.text ? `<div class="text ${c.big ? 'big' : ''}">${c.text}</div>` : ''}${c.tags ? `<div class="tags">${c.tags}</div>` : ''}
        ${poll}${c.media ? media(c.media, i) : ''}${c.fine ? `<p class="fine hid">${c.fine}</p>` : ''}${c.extra || ''}
        ${c.ctx ? `<div class="ctx"><span class="wait">⌛ Readers are adding context…</span><span class="done">✓ Context found. You stayed long enough to see it.</span></div>` : ''}
        <div class="pf"><button class="rb" data-like="${likes}">♥ <span>${fmt(likes)}</span></button><button class="rb">↻ ${fmt(Math.round(v * .008))}</button><button class="rb">✎ ${fmt(Math.round(v * .003))}</button><span class="views">${fmt(v)} views</span></div>
      </div>${stickers(i)}</article>`
    }
    const feed = $('#feed');
    function build() { feed.innerHTML = CARDS.map(card).join('') + `<article class="slot loader" data-i="50"><span class="hourglass">⌛</span><span>Loading more posts for you…</span></article>` }

    const TOTAL = CARDS.length;
    const SECRETS = CARDS.map((c, i) => c.secret ? i : -1).filter(i => i >= 0);
    let S, Z = 100;
    function reset() { S = { started: false, ended: false, idx: 0, enterT: 0, dwell: new Array(TOTAL).fill(0), visited: new Set(), lastAct: now(), triggered: -1, found: new Set(), frags: new Set(), paused: new Set(), keepGo: 0, stays: 0, scrollPx: 0, lastTop: 0, startT: 0, overlay: false, notifN: 0, lastNotif: 0, lastSpawn: 0, spawned: 0, closed: 0, popSeen: new Set(), popFound: new Set(), scripted: new Set(), nudged: false, elapsed: 0, seen: 0, statusT: 0, finalT: 0 } }
    reset();

    function clock() { $('#clock').textContent = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) }
    clock(); setInterval(clock, 15000);
    setTimeout(() => $('#b1').textContent = 'LOW', 500);
    setTimeout(() => $('#b2').textContent = 'Loading Katanya.exe...', 900);
    setTimeout(() => { $('#boot').classList.add('fade'); setTimeout(() => $('#boot').hidden = true, 420) }, 1700);
    $('#startBtn').onclick = () => { $('#welcome').hidden = true; begin() };
    function begin() { feed.classList.remove('locked'); S.started = true; S.startT = now(); S.enterT = now(); S.lastAct = now(); S.visited.add(0); feed.focus({ preventScroll: true }) }

    function act() { S.lastAct = now() }
    ['wheel', 'touchstart', 'touchmove', 'keydown', 'pointerdown'].forEach(ev => document.addEventListener(ev, act, { passive: true, capture: true }));
    feed.addEventListener('scroll', () => {
        const t = feed.scrollTop; S.scrollPx += Math.abs(t - S.lastTop); S.lastTop = t; act();
        if (!$('#note').hidden) closeNote(); const i = Math.round(t / feed.clientHeight); if (i !== S.idx) enter(i)
    }, { passive: true });
    feed.addEventListener('click', e => {
        const sm = e.target.closest('[data-more]'); if (sm) { sm.nextElementSibling.classList.add('open'); sm.remove(); return }
        const lk = e.target.closest('[data-like]'); if (lk) { lk.classList.toggle('liked'); lk.querySelector('span').textContent = fmt(+lk.dataset.like + (lk.classList.contains('liked') ? 1 : 0)) }
    });
    const SCRIPT = { 9: 'visitor', 13: 'chat', 17: 'cookies', 22: 'skip', 27: 'storage', 33: 'hydra', 38: 'captcha', 43: 'update' };
    function enter(i) {
        if (!S.started || S.ended) return;
        const t = now(); if (S.idx < TOTAL) S.dwell[S.idx] += t - S.enterT;
        S.idx = i; S.enterT = t; S.triggered = -1; if (i < TOTAL) S.visited.add(i);
        $('#postCell').textContent = `${Math.min(i + 1, 50)} / 50`;
        document.body.classList.toggle('loud', i >= 38);
        if (i === 7 && S.paused.size === 0 && !S.nudged) { S.nudged = true; tip('Tip', 'Some posts change if you stop scrolling for a moment.') }
        if (SCRIPT[i] && !S.scripted.has(i)) { S.scripted.add(i); setTimeout(() => spawn(SCRIPT[i], true), 600) }
        else { const p = i < 10 ? 0 : i < 30 ? .3 + (i - 10) * .015 : .8; if (Math.random() < p) setTimeout(() => spawn(), rand(500, 1500)); if (i >= 40 && Math.random() < .4) setTimeout(() => spawn(), rand(1600, 2600)) }
        if (i >= TOTAL) endSeq();
    }

    const status = $('#status');
    function setStatus(html, hold) { status.innerHTML = html; S.statusT = hold ? now() + hold : 0 }
    function tick() {
        if (!S.started || S.ended) return;
        const t = now(); S.elapsed = t - S.startT; S.seen = S.visited.size;
        if (S.overlay) { S.lastAct = t; return }
        const idle = t - S.lastAct;
        if (S.triggered !== S.idx && S.idx < TOTAL && idle > 1000) {
            const n = Math.min(10, Math.floor((idle - 1000) / 200));
            setStatus(`Looking closer…<span class="blocks">${Array.from({ length: 10 }, (_, k) => `<i class="${k < n ? 'on' : ''}"></i>`).join('')}</span>`);
            if (idle >= 3000) { S.triggered = S.idx; trigger() }
        } else if (S.statusT) { if (t > S.statusT) setStatus('Done') }
        else if (idle < 1000 && status.textContent !== 'Done') setStatus('Done');
    }
    setInterval(tick, 100);
    function topPop() { let best = null; document.querySelectorAll('#pops .win').forEach(w => { if (!best || +w.style.zIndex > +best.style.zIndex) best = w }); return best }
    function trigger() {
        const i = S.idx; S.paused.add(i);
        const w = topPop();
        if (w && ADS[w.dataset.ad].secret && !S.popFound.has(w.dataset.ad)) { S.popFound.add(w.dataset.ad); w.classList.add('exposed'); const sc = ADS[w.dataset.ad].secret; showNote('you stopped', 'pop-up', sc.title, sc.body); return }
        const c = CARDS[i];
        if (c.secret && !S.found.has(i)) {
            S.found.add(i); feed.children[i].classList.add('exposed'); const sc = c.secret;
            if (sc.kind === 'frag') { S.frags.add(sc.frag); updFrag(); showNote(`note. · fragment ${sc.frag + 1} of 8`, `post #${i + 1}`, FRAGS[sc.frag], S.frags.size === 1 ? 'There is a hidden message in this post. The other pieces are tucked into posts you\'ll scroll past.' : `That's ${S.frags.size} of 8. The rest are still out there, in posts you'll pass.`, true) }
            else { const k = { context: 'context you might have missed', hidden: 'note.', question: 'a question, while you\'re here' }[sc.kind]; showNote(k, `post #${i + 1}`, sc.title, typeof sc.body === 'function' ? sc.body(S) : sc.body) }
        }
        else setStatus(c.secret ? 'You already looked closely here.' : 'Nothing here. Probably.', 2600);
    }
    function showNote(k, n, title, body, frag) { $('#noteK').textContent = k; $('#noteN').textContent = n; const h = $('#noteT'); h.className = frag ? 'frag' : ''; h.textContent = title; $('#noteB').textContent = body; $('#note').hidden = false; S.overlay = true; setStatus('Found something.', 2600) }
    function closeNote() { if ($('#note').hidden) return; $('#note').hidden = true; S.overlay = false; S.lastAct = now() }
    $('#noteStay').onclick = () => { S.stays++; closeNote(); S.triggered = S.idx };
    $('#noteGo').onclick = () => { S.keepGo++; closeNote(); feed.scrollTo({ top: (S.idx + 1) * feed.clientHeight, behavior: 'smooth' }) };
    function updFrag() { $('#fragCell').textContent = FRAGS.map((_, k) => S.frags.has(k) ? '▮' : '▯').join('') }

    const desk = $('#desk'), pops = $('#pops');
    function makeWin({ title, t1, t2, w, html, mode = 'normal', x, y, cls = '', adId }) {
        const win = document.createElement('div'); win.className = 'win pop ' + cls;
        const dw = desk.clientWidth, dh = desk.clientHeight, ww = Math.min(w, dw - 24);
        win.style.width = ww + 'px'; win.style.setProperty('--t1', t1); win.style.setProperty('--t2', t2);
        win.style.left = (x ?? rand(8, Math.max(8, dw - ww - 8))) + 'px'; win.style.top = (y ?? rand(8, Math.max(8, dh * .5))) + 'px'; win.style.zIndex = ++Z;
        const xb = mode === 'none' ? '' : `<button class="wb x ${mode === 'tiny' ? 'tiny' : ''} ${mode === 'delayed' ? 'dis' : ''}" aria-label="Close">×</button>`;
        win.innerHTML = `<div class="tb"><span class="tt">${title}</span><span class="wb" aria-hidden="true">_</span>${xb}</div><div class="wbody">${html}</div>`;
        if (adId) win.dataset.ad = adId;
        (cls.includes('err') ? $('#cascade') : pops).appendChild(win);
        const tb = win.querySelector('.tb'); let drag = null;
        tb.addEventListener('pointerdown', e => { if (e.target.closest('button')) return; drag = { x: e.clientX - win.offsetLeft, y: e.clientY - win.offsetTop }; tb.setPointerCapture(e.pointerId) });
        tb.addEventListener('pointermove', e => { if (!drag) return; win.style.left = Math.max(-ww + 60, Math.min(dw - 60, e.clientX - drag.x)) + 'px'; win.style.top = Math.max(0, Math.min(dh - 30, e.clientY - drag.y)) + 'px' });
        tb.addEventListener('pointerup', () => drag = null);
        win.addEventListener('pointerdown', () => { win.style.zIndex = ++Z });
        if (!cls.includes('err')) { const tk = document.createElement('button'); tk.className = 'btn task'; tk.textContent = title; tk.onclick = () => win.style.zIndex = ++Z; $('#tasks').appendChild(tk); win._task = tk }
        return win;
    }
    function closeWin(win) { if (!win.isConnected) return; win._task && win._task.remove(); win.remove(); if (win.dataset.ad) { S.closed++; if (ADS[win.dataset.ad].mode === 'hydra' && !win.dataset.child) { for (let k = 0; k < 2; k++)setTimeout(() => spawn('hydra', true, { child: 1 }), 150 + k * 220) } } S.lastAct = now() }
    function jump(win) { const dw = desk.clientWidth, dh = desk.clientHeight; win.style.left = rand(8, Math.max(8, dw - win.offsetWidth - 8)) + 'px'; win.style.top = rand(8, Math.max(8, dh - win.offsetHeight - 8)) + 'px' }

    const ADS = {
        visitor: {
            title: '!!! YOU WON !!!', t1: '#c4000b', t2: '#ff6a00', w: 300, mode: 'runaway',
            html: `<div class="ad-c"><div class="blink" style="font-weight:bold;color:var(--hot)">★ CONGRATULATIONS ★</div><h5>You are the 1,000,000th visitor!</h5><p>Claim your FREE prize before it expires.</p><button class="btn big" data-close>CLAIM PRIZE</button><p class="fine hid">Every visitor is the 1,000,000th visitor.</p></div>`,
            secret: { title: 'Everyone is the millionth visitor.', body: 'The number in this pop-up never changes. It was written once and shown to every person who ever saw it. The close button ran away from you on purpose.' }
        },
        scan: {
            title: 'SystemGuard PRO™', t1: '#0d5c2f', t2: '#39b54a', w: 310, mode: 'normal',
            html: `<div class="ad-c"><b>Scanning your device…</b><div class="prog ins"><i data-p></i></div><p data-res hidden><b style="color:var(--hot)">3 threats found:</b><br>Doomscrolling · Boredom · Attention Span</p><button class="btn big" data-close data-res hidden>FIX NOW</button><p class="fine hid">Scan duration is fixed. Results are pre-set.</p></div>`,
            init: w => { const p = w.querySelector('[data-p]'); let v = 0; const t = setInterval(() => { v += 7; p.style.width = Math.min(100, v) + '%'; if (v >= 100) { clearInterval(t); w.querySelectorAll('[data-res]').forEach(e => e.hidden = false) } }, 160) },
            secret: { title: 'There was no scan.', body: 'The progress bar is an animation with a fixed length. The "threats" were written before you arrived.' }
        },
        cookies: {
            title: 'Your privacy matters to us', t1: '#2a2f45', t2: '#6b7194', w: 330, mode: 'none',
            html: `<div class="ad-c"><p style="text-align:left">We and our <b>2,341 partners</b> use cookies to personalize your feed.</p><div class="chk"><label><input type="checkbox" checked disabled> Essential</label><label><input type="checkbox" checked data-sticky> Personalized content</label><label><input type="checkbox" checked data-sticky> Measure how long you stay</label><label><input type="checkbox" checked data-sticky> Share your attention with partners</label></div><button class="btn big" data-close style="width:100%">Accept all</button><button class="lnk" data-close>save my choices</button><p class="fine hid">There is no "reject all" button.</p></div>`,
            init: w => w.querySelectorAll('[data-sticky]').forEach(c => c.addEventListener('change', () => { if (!c.checked) setTimeout(() => { c.checked = true }, 700) })),
            secret: { title: '"Reject all" was never an option.', body: 'Both buttons close the window and keep everything switched on. Untick a box and it quietly ticks itself again.' }
        },
        skip: {
            title: 'Advertisement', t1: '#111', t2: '#555', w: 320, mode: 'delayed',
            html: `<div class="ad-c"><div class="vid"><span data-cd>Your ad will end in 5</span></div><button class="btn" data-close data-skip hidden>Skip ad ▸</button></div>`,
            init: w => { let n = 5, reset = false; const el = w.querySelector('[data-cd]'); const t = setInterval(() => { if (!w.isConnected) return clearInterval(t); n--; if (n === 1 && !reset) { reset = true; n = 4 } el.textContent = n > 0 ? `Your ad will end in ${n}` : 'Thanks for watching!'; if (n <= 0) { clearInterval(t); w.querySelector('[data-skip]').hidden = false; w.querySelector('.x').classList.remove('dis') } }, 1000) },
            secret: { title: 'The countdown went backwards.', body: 'At one second, it jumped back up to four. It was counting on you not counting.' }
        },
        newsletter: {
            title: 'WAIT! Before you go…', t1: '#b5179e', t2: '#f72585', w: 290, mode: 'tiny',
            html: `<div class="ad-c"><h5>Get 10% OFF</h5><p>Join 2 million smart shoppers.</p><input type="email" placeholder="your@email.com" aria-label="Email"><button class="btn big" data-close style="width:100%">YES, I LOVE SAVING</button><button class="lnk" data-close>no thanks, I prefer paying full price</button></div>`,
            secret: { title: '"No" was written to make you feel bad.', body: 'Designers call this confirmshaming: the decline link is worded so that saying no feels like a mistake. The close button was 9 pixels wide.' }
        },
        spin: {
            title: 'SPIN TO WIN!!', t1: '#ff8800', t2: '#ffd000', w: 280, mode: 'normal',
            html: `<div class="ad-c"><div class="wheel-wrap"><div class="wheel" data-wheel>${Array.from({ length: 8 }, (_, k) => `<span style="transform:rotate(${k * 45 + 20}deg) translate(26px,-5px)">more</span>`).join('')}</div></div><button class="btn big" data-spin>SPIN!</button><p data-won hidden><b>You won: MORE CONTENT</b></p><button class="btn" data-close data-won hidden>Collect prize</button></div>`,
            init: w => w.querySelector('[data-spin]').onclick = e => { e.target.disabled = true; w.querySelector('[data-wheel]').style.transform = `rotate(${1440 + Math.random() * 360}deg)`; setTimeout(() => w.querySelectorAll('[data-won]').forEach(x => x.hidden = false), 2700) },
            secret: { title: 'Every slice says the same thing.', body: 'Look at the wheel again. All eight slices are labelled "more."' }
        },
        captcha: {
            title: 'Security check', t1: '#2b4c9a', t2: '#5a7fd6', w: 290, mode: 'none',
            html: `<div class="ad-c"><p style="text-align:left">Are you still human? <b>Select every square that contains your attention.</b></p><div class="grid9">${'<button aria-label="square"></button>'.repeat(9)}</div><button class="btn big" data-close style="width:100%">Verify</button><p class="fine hid">All answers are accepted.</p></div>`,
            init: w => w.querySelectorAll('.grid9 button').forEach(b => b.onclick = () => b.classList.toggle('on')),
            secret: { title: 'Every square was empty.', body: 'There was nothing to find in the grid, and any answer passes. It only wanted a few more seconds of you.' }
        },
        storage: {
            title: '⚠ Attention storage almost full', t1: '#8a1c1c', t2: '#dd3333', w: 320, mode: 'decoy',
            html: `<div class="ad-c"><p>Your attention is <b>98% full</b>.</p><div class="prog ins"><i style="width:98%;background:var(--hot)"></i></div><p>Upgrade to <b>Attention+</b> for $4.99/month.</p><button class="btn big" data-spawn>Upgrade now</button><button class="lnk" data-close>remind me in 5 minutes</button></div>`,
            secret: { title: 'The X button was part of the ad.', body: 'Clicking the close button in the corner opened another ad. The real way out was the small grey link.' }
        },
        chat: {
            title: 'Lumi · online', t1: '#0f766e', t2: '#14b8a6', w: 250, mode: 'normal', br: 1,
            html: `<div class="ad-c"><div class="chat" data-chat><span class="typing">Lumi is typing…</span></div><p class="fine hid">Lumi is an automated assistant. Messages are scheduled.</p></div>`,
            init: w => { const box = w.querySelector('[data-chat]'); const msgs = ['hey 👋', 'still there?', () => `you've been here ${dur(S.elapsed)}. nice!`, 'don\'t go yet, it gets better ↓']; msgs.forEach((m, k) => setTimeout(() => { if (!w.isConnected) return; const d = document.createElement('span'); d.className = 'm'; d.textContent = typeof m === 'function' ? m() : m; box.insertBefore(d, box.lastChild); if (k === msgs.length - 1) box.lastChild.remove() }, 1200 + k * 2200)) },
            secret: { title: 'Lumi is a script.', body: 'Same four messages, same timing, for everyone. The typing dots run on a timer.' }
        },
        hydra: {
            title: 'HOT DEAL!!!', t1: '#e8251c', t2: '#ff00aa', w: 250, mode: 'hydra',
            html: `<div class="ad-c"><h5 class="blink">90% OFF</h5><p>Today only. Also tomorrow.</p><button class="btn big" data-close>SHOP NOW</button><p class="fine hid">Closing this window opens two more.</p></div>`,
            secret: { title: 'Close one, get two.', body: 'This ad was built to multiply when you closed it. The only way to stop it was to stop.' }
        },
        update: {
            title: 'Update required', t1: '#1a2f86', t2: '#5b7be0', w: 310, mode: 'normal',
            html: `<div class="ad-c"><p style="text-align:left">Katanya.exe needs to update to keep you scrolling.</p><div class="prog ins"><i style="width:63%"></i></div><p class="fine" style="text-align:left">Installing: Autoplay+, Endless Mode, Streaks 2.0</p><div style="display:flex;gap:6px"><button class="btn" data-close>Restart now</button><button class="btn" data-close>Tonight</button></div></div>`
        },
        mention: {
            title: 'Someone mentioned you!', t1: '#5b21b6', t2: '#8b5cf6', w: 290, mode: 'normal',
            html: `<div class="ad-c"><p class="blur">omg did you see what they said about you in the comments</p><button class="btn big" data-see>See what they said</button><p class="fine hid">This message is a placeholder shown to every user.</p></div>`,
            init: w => w.querySelector('[data-see]').onclick = e => { e.target.textContent = 'Log in to see (you are already logged in)' },
            secret: { title: 'Nobody mentioned you.', body: 'The blurred message is the same placeholder for every user. Curiosity was the hook.' }
        },
        live: {
            title: '🔴 LIVE NOW', t1: '#b91c1c', t2: '#ef4444', w: 270, mode: 'tiny',
            html: `<div class="ad-c"><div class="vid">something is happening</div><p><b class="lookers">41,203</b> watching</p><button class="btn big" data-close>Watch</button></div>`
        },
        download: {
            title: 'Your download is ready', t1: '#334155', t2: '#64748b', w: 290, mode: 'normal',
            html: `<div class="ad-c"><button class="dl" data-spawn>DOWNLOAD</button><button class="dl" data-spawn style="background:#1f7ae0;border-color:#0d3f80">START NOW</button><button class="dl" data-spawn>▼ GET IT FREE</button><button class="lnk" data-close>continue to page</button></div>`,
            secret: { title: 'Those buttons were all ads.', body: 'Three fake download buttons, one real link. Ads copy the look of the thing you came for.' }
        }
    };
    const POOL = ['scan', 'newsletter', 'spin', 'mention', 'live', 'download', 'visitor', 'skip'];
    let poolK = 0;
    function cap() { const c = S.idx < 10 ? 0 : S.idx < 20 ? 2 : S.idx < 32 ? 3 : 6; return desk.clientWidth < 620 ? Math.min(c, 4) : c }
    function spawn(id, force, opts = {}) {
        if (!S.started || S.ended) return;
        const open = pops.children.length;
        if (!force && open >= cap()) return; if (open >= 10) return;
        if (!id) { for (let k = 0; k < POOL.length; k++) { const c = POOL[(poolK++) % POOL.length]; if (!pops.querySelector(`[data-ad="${c}"]`)) { id = c; break } } if (!id) return }
        const d = ADS[id]; const dw = desk.clientWidth, dh = desk.clientHeight;
        const pos = d.br ? { x: dw - Math.min(d.w, dw - 24) - 12, y: Math.max(8, dh - 330) } : {};
        const win = makeWin({ ...d, adId: id, ...pos }); if (opts.child) win.dataset.child = 1;
        S.spawned++; S.popSeen.add(id); S.lastSpawn = now();
        const x = win.querySelector('.x');
        if (x) {
            let dodges = 0, pt = 'mouse';
            x.addEventListener('pointerdown', e => pt = e.pointerType);
            if (d.mode === 'runaway') x.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse' && dodges < 2) { dodges++; jump(win) } });
            x.onclick = e => {
                e.stopPropagation();
                if (d.mode === 'runaway' && pt !== 'mouse' && dodges < 1) { dodges++; jump(win); return }
                if (d.mode === 'decoy') { spawn(null, true); return }
                closeWin(win)
            }
        }
        win.addEventListener('click', e => { if (e.target.closest('[data-close]')) { closeWin(win); return } if (e.target.closest('[data-spawn]')) spawn(null, true) });
        d.init && d.init(win);
    }
    setInterval(() => { if (!S.started || S.ended || S.idx < 30) return; const t = now(); if (t - S.lastAct < 3000 && t - S.lastSpawn > (S.idx < 40 ? 6000 : 3800)) spawn() }, 1000);

    const onIcon = e => {
        const b = e.target.closest('[data-icon]'); if (!b) return; const k = b.dataset.icon;

        const off = document.querySelectorAll('#pops .win.sys').length * 28;

        if (k === 'fish') {
            const w = makeWin({
                title: 'bubbles.jpg · Image Viewer',
                t1: '#1a2f86', t2: '#5b7be0', w: 320,
                html: '<img src="Images/bubbles.jpg" alt="Bubbles staring" style="display:block;width:100%;border:2px solid;border-color:var(--lo) var(--hi) var(--hi) var(--lo)">'
                    + '<p style="margin:8px 0 0;font-size:11px;color:var(--muted)">bubbles.jpg · 736 × 797 <br>This is Bubbles. Bubbles has been looking at you for longer than you\'ve been looking at anything.</p>'
                    + '<div style="margin-top:10px;text-align:right"><button class="btn" data-x>OK</button></div>',
                x: 120 + off, y: 30 + off, cls: 'sys'

            });
            w.addEventListener('click', ev => { if (ev.target.closest('[data-x],.x')) closeWin(w); });
            return;
        }

        if (k === 'fih') {
            const w = makeWin({
                title: 'fig.jpg · Image Viewer',
                t1: '#1a2f86', t2: '#5b7be0', w: 300,
                html: '<img src="Images/fih.jpg" alt="Fig to camera" style="display:block;width:100%;border:2px solid;border-color:var(--lo) var(--hi) var(--hi) var(--lo)">'
                    + '<p style="margin:8px 0 0;font-size:11px;color:var(--muted)">fih.jpg · 736 × 981 <br>This is Fig. Fig would not hold still for three seconds. Fig is fine with that.</p>'
                    + '<div style="margin-top:10px;text-align:right"><button class="btn" data-x>OK</button></div>',
                x: Math.max(8, desk.clientWidth - 430 - off), y: 30 + off, cls: 'sys'
            });
            w.addEventListener('click', ev => { if (ev.target.closest('[data-x],.x')) closeWin(w); });
            return;
        }

        const html = k === 'attn' ? '<p style="margin:0">This folder is empty.</p><p style="margin:6px 0 0;color:var(--muted);font-size:11px">0 items · 0 bytes free</p>'
            : k === 'bin' ? `<p style="margin:0">${S.visited.size} post(s) forgotten.</p><p style="margin:6px 0 0;color:var(--muted);font-size:11px">Emptied automatically.</p>`
                : `<p style="margin:0;font-family:var(--f-mono);font-size:14px;line-height:1.6">${FRAGS.map((f, i) => S.frags.has(i) ? f : '_'.repeat(f.length)).join(' ')}</p>`;
        const w = makeWin({
            title: { attn: 'Info stuff', bin: 'Trash', found: 'goldfish.txt · Notepad' }[k], t1: '#1a2f86', t2: '#5b7be0', w: 260, html: html + '<div style="margin-top:12px;text-align:right"><button class="btn" data-x>OK</button></div>',
            x: 110 + off, y: 40 + off, cls: 'sys'
        });
        w.addEventListener('click', ev => { if (ev.target.closest('[data-x],.x')) closeWin(w) });
    };

    desk.querySelectorAll('.icons').forEach(el => el.addEventListener('click', onIcon));

    const NOTES = [['KATANYA!', 'maya.k liked your post'], ['KATANYA!', '3 people you may know just joined'], ['KATANYA!', '🔴 Something is happening right now'], ['Messages', 'You have 12 unread messages'], ['Screen Time', 'Your screen time was up 23% last week'], ['KATANYA!', 'You were mentioned in a thread'], ['Photos', 'Your memories from 3 years ago are ready'], ['KATANYA!', 'Someone viewed your profile'], ['MegaDealz', 'Flash sale ends in 10 minutes'], ['Battery', '20% remaining. Still scrolling?'], ['KATANYA!', 'priya shared a post with you'], ['KATANYA!', 'Don\'t miss what your friends are saying']];
    function tip(app, msg) { const el = document.createElement('button'); el.className = 'tip'; el.innerHTML = `<b>${app}</b>${msg}`; const box = $('#tips'); box.prepend(el); while (box.children.length > 3) box.lastChild.remove(); const kill = () => el.remove(); el.onclick = kill; setTimeout(kill, 4200) }
    setInterval(() => {
        if (!S.started || S.ended || S.idx < 12) return; const p = Math.min(1, (S.idx - 12) / 34), gap = 9000 - p * 5600, t = now();
        if (t - S.lastNotif < gap) return; S.lastNotif = t; const n = NOTES[S.notifN % NOTES.length]; S.notifN++; tip(n[0], n[1]);
        const tn = $('#trayN'); tn.hidden = false; tn.textContent = S.notifN; $('#bTitle').textContent = `(${S.notifN + S.spawned}) Katanya · For You`;
    }, 700);
    setInterval(() => { document.querySelectorAll('.cd').forEach(el => { let s = +el.dataset.left || +el.dataset.s; s = s <= 1 ? +el.dataset.s : s - 1; el.dataset.left = s; el.textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0') }) }, 1000);
    setInterval(() => { document.querySelectorAll('.lookers').forEach(el => el.textContent = el.closest('.win') ? fmt(40000 + Math.floor(Math.random() * 3000)) : 2 + Math.floor(Math.random() * 8)) }, 1800);

    function endSeq() {
        if (S.ended) return; S.ended = true; S.finalT = now() - S.startT; closeNote(); feed.classList.add('locked');
        setTimeout(() => {
            let k = 0; const dw = desk.clientWidth; desk.classList.add('glitch'); const t = setInterval(() => {
                makeWin({ title: 'katanya.exe', t1: '#1a2f86', t2: '#5b7be0', w: 260, html: '<div style="display:flex;gap:10px;align-items:center"><span style="font-size:26px">⚠</span><span>Attention not responding.</span></div><div style="text-align:center;margin-top:10px"><span class="btn">OK</span></div>', x: Math.min(20 + k * 22, Math.max(8, dw - 200)), y: 20 + k * 22, cls: 'err' });
                if (++k >= 16) { clearInterval(t); setTimeout(stopFx, 250) }
            }, 110)
        }, 1300);
    }
    function stopFx() {
        const f = $('#stopfx'); f.hidden = false; $('#stopLine').textContent = '';
        setTimeout(() => { $('#stopLine').textContent = `You scrolled 50 posts in ${dur(S.finalT)}.` }, 900);
        setTimeout(() => { $('#blackout').hidden = false; desk.classList.remove('glitch'); f.classList.add('crash') }, 2900);
        setTimeout(() => { f.hidden = true; f.classList.remove('crash'); setTimeout(bsod, 450) }, 3550);
    }
    function bsod() {
        const b = $('#bsod'); b.hidden = false; $('#blackout').hidden = true; const n = S.found.size + S.popFound.size;
        b.innerHTML = `<div class="in"><span class="hd">ERROR</span>
      <p>A fatal exception ATTENTION_OVERFLOW has occurred at post 50 of 50.</p>
      <p>You scrolled 50 posts in ${dur(S.finalT)}, closed ${S.closed} pop-up${S.closed === 1 ? '' : 's'}, and noticed ${n} detail${n === 1 ? '' : 's'}.</p>
      <p>* Press any key or tap to see your report.<br>* Your attention cannot be refunded.</p>
      <p>Press any key to continue <span class="cur">_</span></p></div>`;
        const go = () => { document.removeEventListener('keydown', go); b.hidden = true; report() };
        b.onclick = go; setTimeout(() => document.addEventListener('keydown', go), 400); b.focus();
    }
    function report() {
        $('#cascade').innerHTML = ''; pops.innerHTML = ''; $('#tips').innerHTML = '';[...$('#tasks').children].slice(1).forEach(t => t.remove());
        const tk = document.createElement('span'); tk.className = 'btn task main'; tk.textContent = 'Report'; $('#tasks').appendChild(tk);
        const D = S.dwell, K = (a, b) => `<span>${a}</span><span>${b}</span>`;
        let minI = 0, maxI = 0; D.forEach((d, i) => { if (d > 0 && (D[minI] === 0 || d < D[minI])) minI = i; if (d > D[maxI]) maxI = i });
        const skims = D.filter(d => d > 0 && d < 1500).length;
        const map = CARDS.map((c, i) => { let cl = S.found.has(i) ? 'found' : S.paused.has(i) ? 'stopped' : D[i] >= 1500 ? 'looked' : ''; if (c.secret && !S.found.has(i)) cl += ' missed'; return `<i class="${cl}" title="Post ${i + 1}: ${(D[i] / 1000).toFixed(1)}s">${i + 1}</i>` }).join('');
        const msg = FRAGS.map((f, k) => S.frags.has(k) ? `<span class="got">${f}</span>` : `<span class="miss">${f.replace(/[A-Z]/g, '_')}</span>`).join(' ');
        const body = sc => typeof sc.body === 'function' ? sc.body(S) : sc.body;
        const item = i => { const sc = CARDS[i].secret; return `<li><span class="n">#${String(i + 1).padStart(2, '0')}</span><b>${sc.kind === 'frag' ? `Fragment: "${FRAGS[sc.frag]}"` : sc.title}</b><p>${sc.kind === 'frag' ? 'Hidden in small type inside the image.' : body(sc)}</p></li>` };
        const got = [...S.found].sort((a, b) => a - b), miss = SECRETS.filter(i => !S.found.has(i));
        const pSeen = [...S.popSeen].filter(k => ADS[k].secret), pGot = pSeen.filter(k => S.popFound.has(k)), pMiss = pSeen.filter(k => !S.popFound.has(k));
        const pItem = k => `<li><span class="n">pop</span><b>${ADS[k].secret.title}</b><p>${ADS[k].secret.body}</p></li>`;
        const nGot = got.length + pGot.length, nMiss = miss.length + pMiss.length;
        const el = $('#report'); el.hidden = false;
        el.innerHTML = `<div class="win" role="dialog" aria-labelledby="repT">
        <div class="tb"><span class="tt" id="repT">Report · katanya.exe</span><span class="wb" aria-hidden="true">_</span><button class="wb x" id="repX" aria-label="Close">×</button></div>
        <div class="wbody">
          <div class="rhead"><span class="ico">⚠</span><div><b>Katanya.exe stopped responding.</b><p>Here's what happened while you were scrolling.</p></div></div>
          <div class="spent"><span>Total spent</span><b>${dur(S.finalT)}</b></div>
          <fieldset class="grp"><legend>Usage</legend><div class="kv">
            ${K('Posts scrolled', '50')}${K('Average time per post', (S.finalT / 50 / 1000).toFixed(1) + 's')}${K('Posts given under 1.5 seconds', skims)}${K('Quickest post', `#${minI + 1} · ${(D[minI] / 1000).toFixed(1)}s`)}${K('Longest stop', `#${maxI + 1} · ${(D[maxI] / 1000).toFixed(1)}s`)}${K('Pop-ups shown / closed', `${S.spawned} / ${S.closed}`)}${K('Notifications', S.notifN)}${K('Feed scrolled, at screen size', (S.scrollPx / 96 * .0254).toFixed(1) + ' m')}
          </div></fieldset>
          <fieldset class="grp"><legend>Attention map · posts 1–50</legend><div class="amap">${map}</div>
            <div class="legend"><span><i></i>Skimmed</span><span><i style="background:#a9a69c"></i>Looked</span><span><i style="background:var(--title)"></i>Stopped</span><span><i style="background:var(--hl)"></i>Noticed</span><span><i><b style="position:absolute;top:1px;right:1px;width:5px;height:5px;background:var(--hot)"></b></i>Hid something you missed</span></div></fieldset>
          <fieldset class="grp"><legend>Hidden message · ${S.frags.size} of 8 found</legend><div class="rmsg ins">${msg}</div></fieldset>
          <fieldset class="grp"><legend>Details you noticed · ${nGot}</legend>${nGot ? `<ul class="rlist got ins">${got.map(item).join('')}${pGot.map(pItem).join('')}</ul>` : '<p style="margin:0;color:var(--muted)">None. Every detail needed three seconds of not scrolling.</p>'}</fieldset>
          <fieldset class="grp"><legend>Details you scrolled past · ${nMiss}</legend>${nMiss ? `<ul class="rlist miss ins">${miss.map(item).join('')}${pMiss.map(pItem).join('')}</ul>` : '<p style="margin:0;color:var(--muted)">Nothing. You caught every one.</p>'}</fieldset>
          <p class="rnote">This isn't a test you failed. Feeds are built to be quick, and quick is easy to fall into. Everything in this report was there the whole time, in small type, in fine print, behind a close button. Seeing it only took a few seconds of staying put.</p>
        </div>
        <div class="rfoot"><button class="btn big" id="again">Scroll again, slower</button><button class="btn big" id="shut">Shut down</button></div>
      </div>`;
        $('#again').onclick = restart; const shut = () => { $('#safe').hidden = false }; $('#shut').onclick = shut; $('#repX').onclick = shut;
    }
    $('#safe').onclick = () => { $('#safe').hidden = true; restart() };
    function restart() {
        $('#report').hidden = true; $('#bsod').hidden = true; $('#blackout').hidden = true; $('#stopfx').hidden = true; desk.classList.remove('glitch'); pops.innerHTML = ''; $('#cascade').innerHTML = ''; $('#tips').innerHTML = '';
        [...$('#tasks').children].slice(1).forEach(t => t.remove()); $('#trayN').hidden = true; $('#bTitle').textContent = 'Katanya · For You';
        document.body.classList.remove('loud'); feed.classList.remove('locked');
        reset(); build(); feed.scrollTop = 0; updFrag(); setStatus('Done'); $('#postCell').textContent = '1 / 50'; begin();
    }
    build();
})();