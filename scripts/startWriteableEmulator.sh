if [ $# -lt 1 ]; then
  echo "Available emulators:\n"
  emulator -list-avds
  EMULATOR="$(emulator -list-avds | tail -1)"
  echo "\nUsage:\n$0 $EMULATOR"
  exit
fi

emulator -avd $1 -writable-system
