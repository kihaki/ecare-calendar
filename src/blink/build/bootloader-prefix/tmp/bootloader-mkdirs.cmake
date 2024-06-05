# Distributed under the OSI-approved BSD 3-Clause License.  See accompanying
# file Copyright.txt or https://cmake.org/licensing for details.

cmake_minimum_required(VERSION 3.5)

file(MAKE_DIRECTORY
  "/Users/endboss/esp/v5.2.1/esp-idf/components/bootloader/subproject"
  "/Users/endboss/dev/react/barmer-ecare-android-calendar/src/blink/build/bootloader"
  "/Users/endboss/dev/react/barmer-ecare-android-calendar/src/blink/build/bootloader-prefix"
  "/Users/endboss/dev/react/barmer-ecare-android-calendar/src/blink/build/bootloader-prefix/tmp"
  "/Users/endboss/dev/react/barmer-ecare-android-calendar/src/blink/build/bootloader-prefix/src/bootloader-stamp"
  "/Users/endboss/dev/react/barmer-ecare-android-calendar/src/blink/build/bootloader-prefix/src"
  "/Users/endboss/dev/react/barmer-ecare-android-calendar/src/blink/build/bootloader-prefix/src/bootloader-stamp"
)

set(configSubDirs )
foreach(subDir IN LISTS configSubDirs)
    file(MAKE_DIRECTORY "/Users/endboss/dev/react/barmer-ecare-android-calendar/src/blink/build/bootloader-prefix/src/bootloader-stamp/${subDir}")
endforeach()
if(cfgdir)
  file(MAKE_DIRECTORY "/Users/endboss/dev/react/barmer-ecare-android-calendar/src/blink/build/bootloader-prefix/src/bootloader-stamp${cfgdir}") # cfgdir has leading slash
endif()
