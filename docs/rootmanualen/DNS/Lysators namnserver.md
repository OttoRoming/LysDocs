> Baserad på <https://datorhandbok.lysator.liu.se/index.php/Rootmanual:Blandat_YP_och_DNS>

Lysator använder sig av en hidden master DNS-server, som finns på `ns.lysator.liu.se`. Denna propagerar sedan ut zoner till `ns-master.lysator.liu.se` och slavzoner. 

## DNS-poster

För att lägga till eller ändra i DNS gör följande:

1. Logga in på `ns.lysator.liu.se` (som din vanliga användare).
    - Inloggning kan endast ske inom Lysators nät, mellanlanda till exempel på `shipon.lysator.liu.se`.
    - Din hemkatalog monteras inte på `ns`, alltså kan du inte autentisera med ssh-nycklar utan måste ange lösenord.

2. Zonfilerna ligger under `/lysator/etc/dns/db` och är versionshanterade med RCS.
    ```
    cd /lysator/etc/dns
    ```

3. Checka ut zonfilen.
    ```
    co -l db/lysator/lysator.zone
    ```

4. Gör önskade ändringar. Kom ihåg att ange på `A` (IPv4) och `AAAA` (IPv6) poster till maskinen.

    !!! example "Vanliga DNS-poster"
        För exempel: så här ser en del poster kring Leslie ut:
        ```
        www                     A       130.236.254.27
                                AAAA    2001:6b0:17:f0a0::1b

        leslie                  A       130.236.254.27
                                AAAA    2001:6b0:17:f0a0::1b

        old                     A       130.236.254.27
                                AAAA    2001:6b0:17:f0a0::1b

        docs                    CNAME   leslie
        ``` 

5. Uppdatera `Serial`-fältet för `@` till dagens datum. Sista två siffrorna kan inkrementeras för att skapa unika `Serial` inom samma dag.
    ```
    @               IN      SOA     ns-master.lysator.liu.se. domainmaster.lysator.liu.se. (
                       uppdatera -> 2025051301      ; Serial (yyyymmddnn)
                                    10800           ; Refresh 3 hours
                                    3600            ; Retry   1 hour
                                    3600000         ; Expire  1000 hours
                                    600 )           ; Minimum 10 min (neg cache)
    ```

6. Checka in den ändrade filen. Du kommer bli ombedd att skriva ett meddelande som beskriver ändringarna.
    ```
    ci -u db/lysator/lysator.zone
    ```

7. Bli root och kör `make` i `/lysator/etc/dns` för att applicera konfigurationen.
    ```
    su -
    cd /lysator/etc/dns
    make
    ```

8. Om du hade skrivit fel syntax i zonfilerna kommer det synas här. Lämna isåfall root och gör de nödvändiga ändringarna.

9. Annars, du är färdig!
