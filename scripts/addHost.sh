if [ $# -lt 1 ]; then
  echo "\nUsage:\n$0 HOST_NAME"
  exit
fi

if [ $(adb devices|wc -l) == 2 ]; then
  echo "No devices running."
  exit
fi

adb root
adb remount
adb pull /system/etc/hosts hosts.tmp

if grep -q "$1" hosts.tmp; then
  echo "\nAborting: /etc/hosts file already contains $1"
  rm hosts.tmp
  exit
fi

echo "10.0.2.2 \t$1" >> hosts.tmp
adb push hosts.tmp /system/etc/hosts
# rm hosts.tmp
