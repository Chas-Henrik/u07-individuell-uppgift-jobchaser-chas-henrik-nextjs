# Job Chaser

This is a single-page, 'Job Chaser App' built with Typescript, React & NextJS.

The design is a 'Mobile First' responsive design that also support Tablet's and Desktop's. Breakpoints have been set at 650px for Tablet's & Small Desktop's, and 1024px for Medium & Large Desktop's.  

The 'Job Chaser App' fetches job postings from the 'JobTechDev API' (see [https://jobsearch.api.jobtechdev.se/](https://jobsearch.api.jobtechdev.se/)), and displays the fetched job postings in a Job List. 

The app supports the following features:
1. Dark/light-mode
2. Filter jobs on: Position, Role, Contract Type, City Region & Country
3. Free text search on the Headline property.
4. Mark/Un-mark job as favorite & favorite job list.

The site has been published on Vercel:  
[https://u07-individuell-uppgift-jobchaser-chas-henrik-nextjs-yunn.vercel.app/](https://u07-individuell-uppgift-jobchaser-chas-henrik-nextjs-yunn.vercel.app/)

***
*Known problems:*
  
1. The Job list is only read once (at 'Jobs Page' Load/Re-load), and no effort has been spent to keep the local content synchronized with the database after that. So the local data might not reflect what is currently in the data base at any point of time (e.g. if new jobs are added to the database or expired jobs are removed). However, it is assumed that the job list from the 'JobTechDev API' is not updated very frequently, so this should not be any major issues and one can always reload to fetch the latest data.

*Notes:*
  
1. 

***

## Frågor:

## Vecka 1

#### Allmänt om ramverket React: Hur/Varför uppkom det? 
React utvecklades av några utvecklare på Facebook.
Det vill lösa sina problem och behövdes ett nytt sätt att tänka och upphäva best practices (HTML/CSS/JS) till att använda komponenter.

Vanilla JS 'skalar' dåligt, svårt att underhålla & återanvända och det är besvärligt att uppdatera UI't när datat ändras.

#### Vad är centralt i React?
1. JSX och komponenter.
2. React tar hand om DOM:en, virtual DOM:en.
3. Effektivt: Om något ändras i UI:et så omrenderas endast den komponenten!
4. React är deklarativt.

### Vad är JSX?
JSX står för 'JavaScript XML'.  
JSX är en syntaktisk förlängning av JavaScript som används i React för att skriva komponenternas struktur på ett XML-liknande sätt. Det gör det enklare att skapa dynamiska gränssnitt genom att blanda HTML-liknande kod direkt i JavaScript.

### Vad är en komponent?
En React komponent är en del av UI:et och innehåller:
1. Data
2. Logik
3. Utseende

Det finns både funktions komponenter och klass komponenter, och en funktions komponent är egenligen en vanlig funktion som använder React ramverket och returnerar JSX.

### Vad är props?
En förkortning för properties.
Dessa properties utgör en kommunikationskanal mellan parent och child.
Props ska behandlas ska behandlas immutable av child:en så att den inte orsakar 'side-effects' i parent:en.

### Vad menas med one-way-dataflow?
Man skickar bara data från Parent till Child (och inte tvärtom) för att ha bättre koll på datat och undvika oönskade 'side effects' & buggar.

### Hur kan man använda sig av konditionell rendering i React?
Med logisk AND operator `{(cond) && <p>Test</p>}` eller ternary operator `<p>{(cond)?"Test1":"Test2"}</p>`. 

### Vad menas med en återanvändbar komponent?
En återanvändbar komponent är en komponent som man kan återanvända en eller flera gånger i samma app och/eller olika appar. En återanvändbar komponent bör vara så generisk som möjligt för att man ska kunna återanvända den i så hög grad som möjligt.

## Vecka 2

### Vad är state i React?
State beskriver komponentens 'tillstånd', och används för att hålla reda på data i komponenten som förändras över tid.

### Vad är det för skillnad mellan state och props?
Props är 'read-only input parametrar' från parent komponenten.
State är intern data som ägs och uppdateras av komponenten själv.
Anrop av 'state updater' funktionen triggar om-rendering av komponenten. 
Om det nya statet påverkar child props så renderas även dessa child komponenter om.

### Vad menas med en kontrollerad komponent i React?
En kontrollerad komponent är en komponent där React kontrollerar komponentens state och renderar om komponenten vid behov om statet ändras.

### Vad är en callback handler?
En callback handler är en funktions referens som skickas med props till en child komponent och exekveras där.
På så sätt kan något triggas i child men tas om hand om i parent komponenten.
Detta är det enda 'tillåtna sättet' för en child att kommunicera med sin parent i React.

### Vad menas med "lifting state up"?
Add dela state mellan komponenter.
Om ett en 'syskon komponent' behöver sin brors/systers state, så löser man detta genom att flytta upp statet till den minsta gemensamma förfadern.

### Vad är syftet med useEffect-hook i React?
Att hantera side-effects som fetchning, API-hämtning, timer, notifieringar.

### Vad är syftet kring den s.k dependency-arrayen i useEffect?
Att om-rendera om dependencyn ändras.

## Vecka 3

### Vilka fördelar finns det med att använda NextJS? Nackdelar?
Fördelar:
Innehåller många bra funktioner och verktyg för att underlätta utveckling av webbplatser/applikationer som t.ex.
1. Underlättar vid utveckling av fullstack appar.
2. Stödjer 'Server Side Rendering'.
3. Underlättar Routing (med App-router).
4. Man kan ha front-end och back-end i samma mapp.
5. Enkelt att publicera med Vercel.
6. Optimering av bilder & typsnitt.

Nackdelar:
1. Dependency problem mellan olika versioner av mjukvaror.

### Vad menas med Routing? På vilket sätt löser NextJS Routing v.s "vanliga React"?
En URL består av ett protokoll (t.ex. `https://`), en domän (t.ex. `chasacademy.se`) och en route (t.ex. `/studera-hos-oss`) och routing är navigeringen mellan olika routes.

Den klassiska lösningen att skapa routes i React är med React router som kräver en del kod.
NextJS erbjuder en enklare lösning med mappbaserad routing (med App-router).

### Vad menas med Reacts ekosystem? Nämn några viktiga bibliotek i Reacts ekosystem?
Reacts ekosystem består av de verktyg och bibliotek som byggts kring React för att underlätta utveckling.

Viktiga bibliotek i Reacts ekosystem:
1. React Router  för routing
2. Redux eller React Query för state-hantering
3. Next.js för server side rendering

### Vad är syftet med useContext? Vilket problem med props löser den?
Att tillhandahålla globala variabler inom ett specifikt kontext. 
Man slipper propagera dessa variabler m.h.a. props parametrar genom komponent trädet.

## Vecka 4

### Vad är Redux Toolkit?

### När, i vilka situationer vill man använda Redux Toolkit?

