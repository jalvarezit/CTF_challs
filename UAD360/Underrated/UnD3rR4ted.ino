/*
Challenge created using Arduino UNO
*/
#include <SoftwareSerial.h>
#define RX 0
#define TX 1

SoftwareSerial serial(RX, TX, 1);

void setup() {

  pinMode(RX, INPUT);
  pinMode(TX, OUTPUT);
    
  serial.begin(69);

  
}

void loop() {
  // Do nothing
  serial.println("UAD360{b4UdS_4r3_Tr1Cky}");
  delay(2000);
}