---
title: Annat
---

## Ändra skal på CPU-servrar / arbetsstationer

Det går inte att ändra skal med `chsh` så istället så modifieras `.bashrc` så att den
uppgraderar till ett nytt skall om det är tillgängligt och bash körs interaktivt.

Alla skal finns inte tillgängligt på alla maskiner så flera if-satser kan användas för att ranka skal efter preferens.

Miljövariabeln `$USE_BASH` kan sättas till 1 för att faktiskt använda bash
(eftersom om man kör kommandot bash så öppnas inte längre bash).

Lägg till följande i din `.bash_rc` och byt SKAL mot ditt skal.

```bash
if [ -x "$(command -v SKAL)" ] && [[ ! $USE_BASH = 1 ]]; then  
    [[ $- != *i* ]] && return    
    exec SKAL
fi
```
