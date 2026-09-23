# Nettside for Jack Everett Kane

> Denne filen leses automatisk av Claude Code når du åpner denne mappen.
> Fyll inn det som står i [klammer] før du starter.

## Mål
En rask, mobilvennlig artistside som får besøkende til å:
1. Lytte på Spotify (primært)
2. Se musikkvideoene på YouTube
3. Følge Jack på sosiale medier

## Artisten
Jack Everett Kane er en artist innen Southern Gothic, dark Americana og filmatisk folk. Han har dyp barytonstemme og akustisk gitar.
Låtene handler om krigere, opprørere, elskende, fredløse og glemte sjeler, ofte historiske skikkelser som Boudica, Jeanne d'Arc, 47 Ronin, Galileo og Ned Kelly.
Slagord: **«Songs with stories. Stories with scars.»**
Full bio ligger i `innhold/bio.md`.

## Stil og stemning
- Mørk, filmatisk Southern Gothic: regn, kråker, røyk, spotlys, gammelt lær og tintype-foto
- Farger hentet fra bildene: nesten svart/kull bakgrunn, varm grå og sepia, off-white tekst og **oransje-rød aksent** (fra Jacks brilleglass) på knapper og lenker
- Typografi: høy, smal og slitt serif i versaler til overskrifter (slik som «JACK EVERETT KANE» på plakaten i `bilder/originaler/`, bare som stilreferanse) og en ren, lesbar brødtekst
- Subtil filmkorn- eller tekstureffekt er fint. Unngå glorete og moderne «tech»-uttrykk.
- Referansesider jeg liker: [valgfritt: lim inn lenker]

## Seksjoner (én side, med meny som scroller til seksjonene)
1. **Hero:** stort bilde av Jack, navnet, knapp «Lytt på Spotify» og ikoner for strømmetjenester
2. **Siste utgivelse:** det nyeste albumet fremhevet, med innebygd Spotify-spiller
3. **Diskografi:** alle 5 album (nyeste først) i et rutenett (cover, tittel, år). Klikk åpner sangliste og Spotify-spiller.
4. **Video:** 2 innebygde YouTube-videoer
5. **Om Jack:** bio og slagord. Siden skal **ikke** nevne AI.
6. **Følg Jack:** lenker til Spotify, YouTube, TikTok, Instagram og Facebook. Ingen e-post eller kontaktskjema foreløpig.
7. **Footer:** © Jack Everett Kane, lenker

## Innhold og filer
- Tekst: `innhold/bio.md`, `innhold/album.md`, `innhold/lenker.md`, `innhold/videoer.md`
- Bilder: `bilder/originaler/` og `innhold/bildeutvalg.md`, som sier hva hvert bilde skal brukes til
- **Ikke** endre originalfilene i `bilder/originaler/` eller i album-mappene. Lag optimaliserte kopier i `bilder/`.

## Tekniske krav
- Statisk nettside, helst **Astro** eller ren HTML/CSS/JS
- Bilder konverteres til WebP, maks 2000 px bredde og helst under 300 KB
- **Ingen fulle lydfiler på siden.** Bruk Spotify- og YouTube-embeds.
- Lazy-loading av embeds og bilder slik at siden laster raskt
- God SEO: title, meta description, Open Graph-bilde for deling, favicon
- Skal publiseres på **[Netlify / Vercel / GitHub Pages]**, domene: **[jackeverettkane.com]**
- Språk på nettsiden: **engelsk**

## Arbeidsmåte
- Bygg først en fungerende versjon av hele siden, og vis den lokalt.
- Deretter justerer vi design og innhold i små steg.
- Spør hvis noe i innholdsfilene mangler eller er merket [SJEKK].
