---
title: Fedora
---

Fedora marknadsförs som något väldigt lätt och smidigt att använda, och rekommenderas därför ofta
till nybörjare.
Det är i mångt och mycket helt rätt, men det man lätt glömmer är att det faktiskt finns några
hakar som man gärna vill lösa innan Fedora är bra på riktigt.

## Mediakodek: Problemet

Mediakodek är ett odjur som olika operativsystem löser på helt olika sätt.
Många mediakodek -- som du förmodligen vill använda -- är i amerikansk rätt patentskyddade, vilket gör distribution
av dem kluriga. I vissa länder -- som Frankrike -- erkänner man ej patent för mjukvara, och
därför inte heller några patentavgifter för dessa kodek. Detta är varför VLC kan paketera kodek i
sin installation utan avgift (det är baserat i Frankrike).
I Sverige följer vi den Europesika patentkonventionen (EPC),
vilket är samma myndighet som fransk rätt följer.
Sverige erkänner likt Frankrike inte heller patent på mjukvara,
men rent generellt så finns det en hel del juridiska drakar i det här området.
Vi kommer i den här guiden att utgå från att Svensk rätt och Fransk rätt är förenlig i detta område, då
vi trotts allt är i union med franskjävlarna <3. Jag är dock ingen advokat.

De flesta Linux distrubitionerna distruberar mediakodek trotts att det är tvetydligt hurvudare de
egentligen måste betala för kodekarna eller ej.
Exempel på sådana distributioner är Arch Linux & Debian.
Fedora vilket är klart och tydligt baserat i amerikas förenta stater,
och som dessutom har en stark koppling till det kommersiella Red Hat (rövhatt) har valt att tolka
rätten som att de ej får lov att distribuera samtliga mediakodeks, utan att betala för nöjet.
Resultatet blir att din kopia av Marvels senaste sörja ej går att spela, vilket vi så klart inte vill!

## Mediakodek: Lösningen

Lösningen på Fedoras onödigt restriktiva läsning stavas _RPM Fusion_.
Det är ett gemenskapsdrivet projekt, som distribuerar ickefri mjukvara samt dessa kodekar.
Det är så nära ett officiellt projekt det kan bli, utan att vara officiellt, och en läsning
är att det existerar för att lösa alla dessa företagsrelaterade problem.

För att citera Jesus:

> Gå in genom den trånga porten.
> Den port är vid och den väg är bred som leder till fördärvet,
> och det är många som går in genom den.
> Men den port är trång och den väg är smal som leder till livet, och det är få som finner den.

Nåväl, nu när du är såld, låt oss gå vidare!

Du lägger till förrådet med följande:

```bash
sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm \
    https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
sudo dnf config-manager setopt fedora-cisco-openh264.enabled=1
```

Därefter vill du installera RPM Fusions ickeparaLYSerade ffmpeg samt fler kodekar:

```bash
sudo dnf swap ffmpeg-free ffmpeg --allowerasing
sudo dnf install @multimedia --setopt="install_weak_deps=False" --exclude=PackageKit-gstreamer-plugin
sudo dnf install rpmfusion-{free,nonfree}-release-tainted
```

### Intel grafik

Du vill ha `intel-media-driver` för ny intelgrafik, och `libva-intel-driver` för äldre.

```bash
# Broadwell (5:e generationens Core) och nyare
sudo dnf install intel-media-driver

# Äldre Intel-grafik
sudo dnf install libva-intel-driver
```

### AMD

Om du har ett AyyMD-kort där du använder de fria drivrutinerna:

```bash
sudo dnf install mesa-va-drivers-freeworld
sudo dnf swap mesa-vulkan-drivers{,-freeworld}
```

Om du är en gejmer vill du också ha 32-bitarsvarianten:

```bash
sudo dnf install mesa-va-drivers-freeworld.i686
sudo dnf swap mesa-vulkan-drivers{,-freeworld}.i686
```

### NVIDIA

För ett NOVIDEOkort

```bash
sudo dnf install libva-nvidia-driver
```

Om du är en gejmer vill du också ha 32-bitarsvarianten:

```bash
sudo dnf install libva-nvidia-driver.i686
```
