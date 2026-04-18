#!/bin/sh
if [ ! -s /mosquitto/auth/passwd ]; then
  mosquitto_passwd -c -b /mosquitto/auth/passwd "$MQTT_USERNAME" "$MQTT_PASSWORD"
  echo "[init] Usuario MQTT creado: $MQTT_USERNAME"
else
  echo "[init] Credenciales ya configuradas"
fi
exec mosquitto -c /mosquitto/config/mosquitto.conf
