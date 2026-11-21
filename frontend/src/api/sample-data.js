// Local sample data that follows the shared API contract.
// getRegistrations() and getSummary() filter, page and total in the browser,
// and return the SAME shapes as registrationsApi.js (the real C# API).

const FEES = { Exhibitor: 1500, Competitor: 2500, VIP: 5000 }

// [participantName, contact, email, address, car, plate, type, status, amountPaid, ISO date]
const RAW = [
  ['Juan Dela Cruz', '09171234567', 'juan@example.com', '123 Rizal St., Naga City', 'Toyota Supra MK4', 'ABC 1234', 'Competitor', 'Confirmed', 1000, '2027-02-10T08:30:00Z'],
  ['Maria Santos', '09181234501', 'maria.santos@example.com', '45 Magsaysay Ave., Sorsogon City', 'Honda Civic Type R', 'DEF 2201', 'VIP', 'CheckedIn', 5000, '2027-02-10T09:15:00Z'],
  ['Pedro Reyes', '09191234502', 'pedro.reyes@example.com', '8 Burgos St., Legazpi City', 'Nissan Skyline GT-R R34', 'GHI 3302', 'Competitor', 'Pending', 0, '2027-02-09T14:00:00Z'],
  ['Ana Villanueva', '09201234503', 'ana.v@example.com', '77 Quezon Blvd., Sorsogon City', 'Mazda MX-5 Miata', 'JKL 4403', 'Exhibitor', 'Confirmed', 1500, '2027-02-09T10:45:00Z'],
  ['Carlo Mendoza', '09211234504', 'carlo.m@example.com', '12 Del Rosario St., Bulan', 'Subaru WRX STI', 'MNO 5504', 'Competitor', 'CheckedIn', 2500, '2027-02-08T16:20:00Z'],
  ['Liza Ramirez', '09221234505', 'liza.ramirez@example.com', '9 Rizal St., Irosin', 'Ford Mustang GT', 'PQR 6605', 'VIP', 'Confirmed', 2500, '2027-02-08T11:05:00Z'],
  ['Mark Bautista', '09231234506', 'mark.b@example.com', '31 Gubat Rd., Gubat', 'Mitsubishi Lancer Evo IX', 'STU 7706', 'Competitor', 'Cancelled', 0, '2027-02-07T13:30:00Z'],
  ['Joy Aquino', '09241234507', 'joy.aquino@example.com', '64 Barcelona St., Casiguran', 'Toyota AE86 Trueno', 'VWX 8807', 'Exhibitor', 'Pending', 750, '2027-02-07T09:00:00Z'],
  ['Ramon Garcia', '09251234508', 'ramon.garcia@example.com', '5 Pilar Rd., Pilar', 'Chevrolet Camaro SS', 'YZA 9908', 'VIP', 'Pending', 0, '2027-02-06T15:10:00Z'],
  ['Teresa Flores', '09261234509', 'teresa.f@example.com', '102 Donsol Ave., Donsol', 'Volkswagen Beetle 1968', 'BCD 1109', 'Exhibitor', 'CheckedIn', 1500, '2027-02-06T08:40:00Z'],
  ['Eduardo Cruz', '09271234510', 'eduardo.cruz@example.com', '18 Juban St., Juban', 'BMW M3 E46', 'EFG 1210', 'Competitor', 'Confirmed', 2500, '2027-02-05T17:25:00Z'],
  ['Grace Navarro', '09281234511', 'grace.navarro@example.com', '26 Matnog Rd., Matnog', 'Porsche 911 Carrera', 'HIJ 1311', 'VIP', 'CheckedIn', 4000, '2027-02-05T12:00:00Z'],
  ['Roberto Castillo', '09291234512', 'roberto.c@example.com', '40 Prieto Diaz St., Prieto Diaz', 'Datsun 240Z', 'KLM 1412', 'Exhibitor', 'Cancelled', 1500, '2027-02-04T10:10:00Z'],
  ['Cynthia Domingo', '09301234513', 'cynthia.d@example.com', '7 Castilla Rd., Castilla', 'Lexus IS 300', 'NOP 1513', 'Competitor', 'Pending', 1200, '2027-02-04T09:35:00Z'],
  ['Miguel Torres', '09311234514', 'miguel.torres@example.com', '88 Bacon District, Sorsogon City', 'Dodge Challenger R/T', 'QRS 1614', 'VIP', 'Confirmed', 5000, '2027-02-03T14:50:00Z'],
  ['Patricia Lim', '09321234515', 'patricia.lim@example.com', '3 Abuyog St., Sorsogon City', 'Mini Cooper S', 'TUV 1715', 'Exhibitor', 'Confirmed', 0, '2027-02-03T11:20:00Z'],
  ['Antonio Pascual', '09331234516', 'antonio.p@example.com', '51 Barcelona Rd., Barcelona', 'Honda S2000', 'WXY 1816', 'Competitor', 'CheckedIn', 2500, '2027-02-02T16:45:00Z'],
  ['Beatriz Salazar', '09341234517', 'beatriz.s@example.com', '14 Bulusan Ave., Bulusan', 'Jaguar E-Type', 'ZAB 1917', 'VIP', 'Pending', 2500, '2027-02-02T10:00:00Z'],
  ['Fernando Ocampo', '09351234518', 'fernando.o@example.com', '22 Gubat St., Gubat', 'Toyota Corolla Altis', 'CDE 2018', 'Exhibitor', 'Pending', 0, '2027-02-01T13:15:00Z'],
  ['Lourdes Aguilar', '09361234519', 'lourdes.a@example.com', '90 Magallanes Rd., Magallanes', 'Suzuki Jimny', 'FGH 2119', 'Competitor', 'Confirmed', 1500, '2027-02-01T09:05:00Z'],
  ['Danilo Soriano', '09371234520', 'danilo.s@example.com', '35 Irosin Plaza, Irosin', 'Mercedes-Benz 190E', 'IJK 2220', 'VIP', 'Cancelled', 5000, '2027-01-31T15:30:00Z'],
  ['Rosario Manalo', '09381234521', 'rosario.m@example.com', '16 Juban Rd., Juban', 'Mazda RX-7 FD', 'LMN 2321', 'Competitor', 'CheckedIn', 2500, '2027-01-31T08:50:00Z'],
  ['Vicente Roxas', '09391234522', 'vicente.r@example.com', '58 Bulan Poblacion, Bulan', 'Ford Model A', 'OPQ 2422', 'Exhibitor', 'Confirmed', 1500, '2027-01-30T12:40:00Z'],
  ['Carmela Gutierrez', '09401234523', 'carmela.g@example.com', '2 Pilar Seaside, Pilar', 'Audi TT RS', 'RST 2523', 'Competitor', 'Pending', 0, '2027-01-30T10:25:00Z'],
  ['Ernesto Valdez', '09411234524', 'ernesto.v@example.com', '70 Rizal Ext., Sorsogon City', 'Chevrolet Corvette C3', 'UVW 2624', 'VIP', 'Confirmed', 5000, '2027-01-29T14:05:00Z'],
  ['Josefina Padilla', '09421234525', 'josefina.p@example.com', '11 Donsol Beach Rd., Donsol', 'Fiat 500 Abarth', 'XYZ 2725', 'Exhibitor', 'CheckedIn', 1500, '2027-01-29T09:30:00Z'],
]

function paymentStatusOf(paid, fee) {
  if (paid <= 0) return 'Unpaid'
  if (paid >= fee) return 'Paid'
  return 'Partial'
}

export const sampleRegistrations = RAW.map((r, i) => {
  const [participantName, contactNumber, email, address, carMakeModel, plateNumber, registrationType, status, amountPaid, registrationDate] = r
  const registrationFee = FEES[registrationType]
  return {
    id: `00000000-0000-4000-8000-${String(i + 1).padStart(12, '0')}`,
    registrationNumber: `CS27-${String(i + 1).padStart(4, '0')}`,
    registrationDate,
    participantName,
    contactNumber,
    email,
    address,
    carMakeModel,
    plateNumber,
    registrationType,
    status,
    registrationFee,
    amountPaid,
    paymentStatus: paymentStatusOf(amountPaid, registrationFee),
  }
})

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/** Same signature and return shape as the real API call. */
export async function getRegistrations({
  participantName = '',
  type = '',
  status = '',
  page = 1,
  pageSize = 10,
} = {}) {
  await delay(400) // so the loading state is visible while building the UI

  const search = participantName.trim().toLowerCase()
  const filtered = sampleRegistrations
    .filter((r) => !search || r.participantName.toLowerCase().includes(search))
    .filter((r) => !type || r.registrationType === type)
    .filter((r) => !status || r.status === status)
    .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate)) // newest first

  const totalCount = filtered.length
  const totalPages = Math.ceil(totalCount / pageSize)
  const start = (page - 1) * pageSize

  return {
    items: filtered.slice(start, start + pageSize),
    page,
    pageSize,
    totalCount,
    totalPages,
  }
}

/** Cancelled registrations are excluded from the money totals (as in the API). */
export async function getSummary() {
  await delay(300)

  const count = (s) => sampleRegistrations.filter((r) => r.status === s).length
  const active = sampleRegistrations.filter((r) => r.status !== 'Cancelled')
  const totalFees = active.reduce((sum, r) => sum + r.registrationFee, 0)
  const totalPayments = active.reduce((sum, r) => sum + r.amountPaid, 0)

  return {
    totalRegistrations: sampleRegistrations.length,
    confirmed: count('Confirmed'),
    checkedIn: count('CheckedIn'),
    pending: count('Pending'),
    cancelled: count('Cancelled'),
    totalFees,
    totalPayments,
    uncollectedPayments: totalFees - totalPayments,
  }
}
