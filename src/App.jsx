import React, { useState } from "react";

const vehicles = [
  { name: "Car", icon: "🚘", rate: 23, detail: "Sedan और अन्य कारें" },
  { name: "Bike", icon: "🏍️", rate: 0, detail: "दो पहिया सफर" },
  { name: "Bus", icon: "🚌", rate: 0, detail: "समूह यात्रा" },
  { name: "Tempo Traveller", icon: "🚐", rate: 0, detail: "परिवार और ग्रुप" }
];

export default function App() {
  const [trip, setTrip] = useState("One Way");
  const [vehicle, setVehicle] = useState("Car");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [distance, setDistance] = useState("");
  const [message, setMessage] = useState("");

  const rate = trip === "Urgent" ? 48 : trip === "Round Trip" ? 38 : 23;
  const estimate = vehicle === "Car" && distance > 0
    ? Number(distance) * rate
    : 0;

  function bookRide(e) {
    e.preventDefault();
    if (!from || !to || !date || !time) {
      setMessage("कृपया सभी जरूरी जानकारी भरें।");
      return;
    }
    setMessage("यह अभी डेमो वेबसाइट है। वास्तविक बुकिंग अभी चालू नहीं है।");
  }

  return (
    <main>
      <header className="topbar">
        <a className="logo" href="#">Yatra<span>Setu</span></a>
        <a className="owner-link" href="#owner">गाड़ी मालिक बनें ↗</a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">आपकी यात्रा, हमारी जिम्मेदारी</div>
          <h1>हर सफर का<br /><span>अपना साथी।</span></h1>
          <p>शहर की सवारी हो या लंबा सफर — अपनी जरूरत के हिसाब से वाहन चुनें।</p>
          <div className="trust">✓ आसान बुकिंग　 ✓ कई वाहन विकल्प　 ✓ सुविधाजनक यात्रा</div>
        </div>

        <form className="booking-card" onSubmit={bookRide}>
          <h2>अपनी सवारी खोजें</h2>
          <p className="muted">अपनी यात्रा की जानकारी भरें</p>

          <div className="trip-tabs">
            {["One Way", "Round Trip", "Urgent"].map(item => (
              <button
                type="button"
                key={item}
                className={trip === item ? "active" : ""}
                onClick={() => setTrip(item)}
              >{item === "One Way" ? "एक तरफ" : item === "Round Trip" ? "आना-जाना" : "तुरंत"}</button>
            ))}
          </div>

          <label>कहाँ से चलना है?
            <input value={from} onChange={e => setFrom(e.target.value)} placeholder="Pickup शहर / स्थान" />
          </label>
          <label>कहाँ जाना है?
            <input value={to} onChange={e => setTo(e.target.value)} placeholder="Destination शहर / स्थान" />
          </label>

          <div className="two-col">
            <label>यात्रा की तारीख
              <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </label>
            <label>समय
              <input type="time" value={time} onChange={e => setTime(e.target.value)} />
            </label>
          </div>

          <label>वाहन चुनें
            <select value={vehicle} onChange={e => setVehicle(e.target.value)}>
              {vehicles.map(v => <option key={v.name}>{v.name}</option>)}
            </select>
          </label>

          {vehicle === "Car" && (
            <label>अनुमानित कुल दूरी (किमी)
              <input type="number" min="1" value={distance} onChange={e => setDistance(e.target.value)} placeholder="जैसे 100" />
            </label>
          )}

          {estimate > 0 && <div className="estimate">अनुमानित किराया <strong>₹{estimate.toLocaleString("en-IN")}</strong><small>टोल, पार्किंग और अन्य लागू शुल्क अलग हो सकते हैं।</small></div>}

          <button className="submit" type="submit">सवारी खोजें →</button>
          {message && <p className="message">{message}</p>}
          <small className="disclaimer">डेमो: अभी वास्तविक बुकिंग या भुगतान सक्रिय नहीं है।</small>
        </form>
      </section>

      <section className="section">
        <div className="section-heading">
          <div className="eyebrow">अपनी जरूरत चुनें</div>
          <h2>हर सफर के लिए सही वाहन</h2>
        </div>
        <div className="vehicle-grid">
          {vehicles.map(v => (
            <button className="vehicle-card" key={v.name} onClick={() => {
              setVehicle(v.name);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}>
              <span className="vehicle-icon">{v.icon}</span>
              <strong>{v.name}</strong>
              <small>{v.detail}</small>
              <span className="choose">चुनें →</span>
            </button>
          ))}
        </div>
      </section>

      <section className="owner-section" id="owner">
        <div>
          <div className="eyebrow">YatraSetu पार्टनर बनें</div>
          <h2>आपके वाहन को मिले<br />नए ग्राहक।</h2>
          <p>वाहन मालिक बनकर अपने शहर में बुकिंग के अवसर पाएँ।</p>
        </div>
        <div className="owner-note">वाहन मालिक पंजीकरण जल्द शुरू होगा।</div>
      </section>

      <footer>
        <a className="logo" href="#">Yatra<span>Setu</span></a>
        <p>हर सफर का अपना साथी।</p>
        <small>© 2026 YatraSetu. सभी अधिकार सुरक्षित।</small>
      </footer>
    </main>
  );
}
