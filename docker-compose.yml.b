version: '3'

services:
    # Frontend
    web:
        image: jitsi/web
        volumes:
            - ${CONFIG}/web:/config
            - ${CONFIG}/web/letsencrypt:/etc/letsencrypt
            - ${CONFIG}/transcripts:/usr/share/jitsi-meet/transcripts
        environment:
            - ENABLE_AUTH
            - ENABLE_GUESTS
            - ENABLE_LETSENCRYPT
            - ENABLE_HTTP_REDIRECT
            - ENABLE_TRANSCRIPTIONS
            - DISABLE_HTTPS
            - JICOFO_AUTH_USER
            - LETSENCRYPT_DOMAIN
            - LETSENCRYPT_EMAIL
            - PUBLIC_URL
            - XMPP_DOMAIN
            - XMPP_AUTH_DOMAIN
            - XMPP_BOSH_URL_BASE
            - XMPP_GUEST_DOMAIN
            - XMPP_MUC_DOMAIN
            - XMPP_RECORDER_DOMAIN
            - ETHERPAD_URL_BASE
            - TZ
            - JIBRI_BREWERY_MUC
            - JIBRI_PENDING_TIMEOUT
            - JIBRI_XMPP_USER
            - JIBRI_XMPP_PASSWORD
            - JIBRI_RECORDER_USER
            - JIBRI_RECORDER_PASSWORD
            - ENABLE_RECORDING
        networks:
            # traefik: change the following line to your external docker network 
            web:
            meet.jitsi:
                aliases:
                    - ${XMPP_DOMAIN}
        labels:
            # traefik: change that to your external network
            - "traefik.docker.network=web"
            - "traefik.enable=true"
            - "traefik.backend=jc_backend"
            # traefik: change that to your actual fqdn 
            - "traefik.frontend.rule=Host:symmeet-eu.symcloud.net"
            - "traefik.port=80"

    # XMPP server
    prosody:
        image: jitsi/prosody
        ports:
            - '5280:5280'
        expose:
            - '5222'
            - '5347'
        volumes:
            - ${CONFIG}/prosody:/config
        environment:
            - AUTH_TYPE
            - ENABLE_AUTH
            - ENABLE_GUESTS
            - GLOBAL_MODULES
            - GLOBAL_CONFIG
            - LDAP_URL
            - LDAP_BASE
            - LDAP_BINDDN
            - LDAP_BINDPW
            - LDAP_FILTER
            - LDAP_AUTH_METHOD
            - LDAP_VERSION
            - LDAP_USE_TLS
            - LDAP_TLS_CIPHERS
            - LDAP_TLS_CHECK_PEER
            - LDAP_TLS_CACERT_FILE
            - LDAP_TLS_CACERT_DIR
            - LDAP_START_TLS
            - XMPP_DOMAIN
            - XMPP_AUTH_DOMAIN
            - XMPP_GUEST_DOMAIN
            - XMPP_MUC_DOMAIN
            - XMPP_INTERNAL_MUC_DOMAIN
            - XMPP_MODULES
            - XMPP_MUC_MODULES
            - XMPP_INTERNAL_MUC_MODULES
            - XMPP_RECORDER_DOMAIN
            - JICOFO_COMPONENT_SECRET
            - JICOFO_AUTH_USER
            - JICOFO_AUTH_PASSWORD
            - JVB_AUTH_USER
            - JVB_AUTH_PASSWORD
            - JIGASI_XMPP_USER
            - JIGASI_XMPP_PASSWORD
            - JIBRI_XMPP_USER
            - JIBRI_XMPP_PASSWORD
            - JIBRI_RECORDER_USER
            - JIBRI_RECORDER_PASSWORD
            - JWT_APP_ID
            - JWT_APP_SECRET
            - JWT_ACCEPTED_ISSUERS
            - JWT_ACCEPTED_AUDIENCES
            - JWT_ASAP_KEYSERVER
            - JWT_ALLOW_EMPTY
            - JWT_AUTH_TYPE
            - JWT_TOKEN_AUTH_MODULE
            - LOG_LEVEL
            - TZ
        networks:
            meet.jitsi:
                aliases:
                    - ${XMPP_SERVER}

    # Focus component
    jicofo:
        image: jitsi/jicofo
        volumes:
            - ${CONFIG}/jicofo:/config
        environment:
            - ENABLE_AUTH
            - XMPP_DOMAIN
            - XMPP_AUTH_DOMAIN
            - XMPP_INTERNAL_MUC_DOMAIN
            - XMPP_SERVER
            - JICOFO_COMPONENT_SECRET
            - JICOFO_AUTH_USER
            - JICOFO_AUTH_PASSWORD
            - JICOFO_RESERVATION_REST_BASE_URL
            - JVB_BREWERY_MUC
            - JIGASI_BREWERY_MUC
            - JIBRI_BREWERY_MUC
            - JIBRI_PENDING_TIMEOUT
            - TZ 
        depends_on:
            - prosody
        networks:
            meet.jitsi:

    # Video bridge
    jvb:
        image: jitsi/jvb
        ports:
            - '${JVB_PORT}:${JVB_PORT}/udp'
            - '${JVB_TCP_PORT}:${JVB_TCP_PORT}'
        volumes:
            - ${CONFIG}/jvb:/config
        environment:
            - DOCKER_HOST_ADDRESS
            - XMPP_AUTH_DOMAIN
            - XMPP_INTERNAL_MUC_DOMAIN
            - XMPP_SERVER
            - JVB_AUTH_USER
            - JVB_AUTH_PASSWORD
            - JVB_BREWERY_MUC
            - JVB_PORT
            - JVB_TCP_HARVESTER_DISABLED
            - JVB_TCP_PORT
            - JVB_STUN_SERVERS
            - JVB_ENABLE_APIS
            - TZ
        depends_on:
            - prosody
        networks:
            meet.jitsi:
    jibri:
        image: jitsi/jibri
        volumes:
            - ${CONFIG}/jibri:/config
            - /dev/shm:/dev/shm
        cap_add:
            - SYS_ADMIN
            - NET_BIND_SERVICE
        devices:
            - /dev/snd:/dev/snd
        environment:
            - XMPP_AUTH_DOMAIN
            - XMPP_INTERNAL_MUC_DOMAIN
            - XMPP_RECORDER_DOMAIN
            - XMPP_SERVER
            - XMPP_DOMAIN
            - JIBRI_XMPP_USER
            - JIBRI_XMPP_PASSWORD
            - JIBRI_BREWERY_MUC
            - JIBRI_RECORDER_USER
            - JIBRI_RECORDER_PASSWORD
            - JIBRI_RECORDING_DIR
            - JIBRI_FINALIZE_RECORDING_SCRIPT_PATH
            - JIBRI_STRIP_DOMAIN_JID
            - JIBRI_LOGS_DIR
            - DISPLAY=:0
            - TZ
        depends_on:
            - jicofo
        networks:
            meet.jitsi:

# Custom network so all services can communicate using a FQDN
networks:
    meet.jitsi:
    # traefik: change the following line to your external docker network 
    web:
        external: true
