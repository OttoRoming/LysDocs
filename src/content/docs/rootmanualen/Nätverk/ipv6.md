---
title: IPv6
---

## Adressplan

För datorer i 254-nätet (`130.236.254.0/24`) gäller för närvarande följande standard:
IPv6-adressen bildas genom att den sista oktetten i IPv4-adressen skrivs om till
hexadecimal form och läggs efter prefixet `2001:6b0:17:f0a0::`.

```shell
printf '2001:6b0:17:f0a0::%x\n' `echo IPv4-adress | cut -d'.' -f4`
```

Exempelvis blir `130.236.254.27` alltså `2001:6b0:17:f0a0::1b`.

Varje adress ska även ha en motsvarande reverse-post (`PTR`) i zonfilen `f0a.zone`,
som är reverse-zon för `2001:6b0:17:f0a0::/64`
(se [Lysators namnserver](../DNS/lysators-namnserver.mdx)).
Postens namn är den sista oktettens två hexadecimala siffror i omvänd ordning.
För `ftp.lysator.liu.se` (`130.236.254.253`, det vill säga `2001:6b0:17:f0a0::fd`)
ser posten ut så här:

```text
d.f    PTR    ftp.lysator.liu.se.
```

## Omvandlare

Skriv in en IPv4-adress så räknas motsvarande IPv6-adress och reverse-post ut direkt.

<div class="ipv6-omvandlare">
  <label for="ipv4-input">IPv4-adress</label>
  <input type="text" id="ipv4-input" placeholder="130.236.254.27" spellcheck="false" autocomplete="off" inputmode="decimal">
  <p id="ipv6-output" aria-live="polite"></p>
</div>

<style>
  .ipv6-omvandlare {
    border: .05rem solid var(--md-default-fg-color--lightest);
    border-radius: .2rem;
    padding: .8rem 1rem;
    margin: 1em 0;
  }
  .ipv6-omvandlare label {
    display: block;
    font-weight: 700;
    margin-bottom: .4rem;
  }
  .ipv6-omvandlare input {
    width: 100%;
    max-width: 18rem;
    font-family: var(--md-code-font-family, monospace);
    font-size: .85rem;
    color: var(--md-default-fg-color);
    background: var(--md-code-bg-color);
    border: .05rem solid var(--md-default-fg-color--lighter);
    border-radius: .1rem;
    padding: .4rem .6rem;
  }
  .ipv6-omvandlare input:focus {
    outline: none;
    border-color: var(--md-accent-fg-color);
  }
  .ipv6-omvandlare p {
    margin: .6rem 0 0;
    min-height: 1.2rem;
  }
  .ipv6-omvandlare p.fel {
    color: #e53935;
  }
  .ipv6-omvandlare small {
    color: var(--md-default-fg-color--light);
  }
</style>

<script>
  (function () {
    var input = document.getElementById("ipv4-input");
    var output = document.getElementById("ipv6-output");
    function convert() {
      var value = input.value.trim();
      output.textContent = "";
      output.classList.remove("fel");
      if (value === "") {
        return;
      }
      var match = value.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
      var octets = match ? match.slice(1).map(Number) : null;
      if (octets === null || octets.some(function (o) { return o > 255; })) {
        output.textContent = "Ogiltig IPv4-adress.";
        output.classList.add("fel");
        return;
      }
      var hex = octets[3].toString(16);
      var nibbles = hex.padStart(2, "0");
      var ipv6 = document.createElement("code");
      ipv6.textContent = "2001:6b0:17:f0a0::" + hex;
      var ptr = document.createElement("code");
      ptr.textContent = nibbles[1] + "." + nibbles[0];
      output.append("IPv6-adress: ", ipv6);
      if (!(octets[0] === 130 && octets[1] === 236 && octets[2] === 254)) {
        var note = document.createElement("small");
        note.textContent = " (obs: adressen ligger inte i 254-nätet)";
        output.append(note);
      }
      output.append(document.createElement("br"), "Reverse-post: ", ptr);
    }
    input.oninput = convert;
    convert();
  })();
</script>
