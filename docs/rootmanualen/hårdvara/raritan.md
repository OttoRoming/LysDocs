KVM-switchen i Bar.

1. Ladda ned "Raritan Multi-Platform Client" [^1].

2. Använd Java 8, tillåt TLSv1 genom att redigera `java.security` [^2].

   Exempel på start-skript:

   ```bash
   #!/bin/bash

   set -e

   cd "$(dirname "$0")"

   JAVA_HOME=/usr/lib/jvm/java-8-openjdk
   JAVA="$JAVA_HOME/jre/bin/java"

   exec "$JAVA" \
     -Xmn128M \
     -Xmx512M \
     -XX:MaxHeapFreeRatio=70 \
     -XX:MinHeapFreeRatio=50 \
     -Dsun.java2d.noddraw=true \
     -classpath "./splugin.jar:./sdeploy.jar:./sFoxtrot.jar:./jaws.jar:./sMpc.jar" \
     com.raritan.rrc.ui.RRCApplication
   ```

3. Få tillgång till Raritan:en genom `skuldafn`, genom att lägga till `192.168.42.10/32` i `AllowedIPs` i Wireguard-konfigurationen, eller manuellt rutta via `skuldafn`.

4. Starta "Raritan Multi-Platform Client" och lägg till host `192.168.42.10` med `admin` som användarnamn och lösenord.

5. Färdig!

[^1]: https://www.prioritycolo.com/tools/

[^2]: https://helpdesk.prioritycolo.com/en/kb/article/resolving-raritan-kvm-over-ip-multi-platform-client-mpc-java-issues
