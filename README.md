# hackathonAFT

Back-end:
- CouchDB
  documents per reservation/lending
    initieel doen we alles per dag
    nadien kunnen we kijken naar verdeling per halve dag of per tijdslots (uur)
    een id per reservatie
    valid reservation: true/false
    apart deel lending
      uitgeleend, teruggebracht, comments/damage
    
  documents for devices per sort
    laptops (dell/hp)
    tablets (ipad/nexus)
    unieke device ids / available: true/false
    
  documents for news
    start & end times
    title & text
    [img]
  
  document for services
    which services are up and running
  
  alles is gebasseerd op s-nummer (userPrincipalName)
  
Angular/Ionic
  Tabbladen:
  - status: current/passed reservations
  - chats: specific chat
  - reservaties:
    1: what you are reservating (computers/study places/cameras) and if for day/device
    2: you choose the moment and duration, after the list with specific devices is filled and chosen from
    3: confirmation of reservation
    
    current reservations: list and be able to undo reservations
  - account: no subs (eventueel naar modal verhuizen)
