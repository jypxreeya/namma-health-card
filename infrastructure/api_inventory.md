# API Inventory
A technical summary of all implemented API endpoints.

## 🔐 Auth & Identity (`/api/auth`)
| Endpoint | Method | Security | Description |
| :--- | :--- | :--- | :--- |
| `/login` | POST | Public | Standard email/password login |
| `/field/login` | POST | Public | Field App OTP request |
| `/field/otp/verify` | POST | Public | Verify OTP and return JWT |
| `/menus` | GET | JWT | Fetch sidebar menus based on Role |

## 📋 Registration & Onboarding (`/api/registration`)
| Endpoint | Method | Security | Description |
| :--- | :--- | :--- | :--- |
| `/onboard` | POST | JWT | Finalize patient registration |
| `/drafts` | POST | JWT | Save partial registration progress |
| `/drafts` | GET | JWT | List current user's drafts |

## 🏥 Hospital Operations (`/api/hospital`)
| Endpoint | Method | Security | Description |
| :--- | :--- | :--- | :--- |
| `/patient/search` | GET | JWT | Find patient by phone or ID |
| `/card/validate` | POST | JWT | Verify health card status |
| `/checkin` | POST | JWT | Record patient arrival |
| `/service-entry` | POST | JWT | Log medical services used |
| `/visit-history` | GET | JWT | View past check-ins |

## 📊 Analytics & Reporting (`/api/admin/analytics`)
| Endpoint | Method | Security | Description |
| :--- | :--- | :--- | :--- |
| `/dashboard/overview` | GET | JWT | High-level system stats |
| `/executives/performance`| GET | JWT | Field team KPIs |
| `/hospitals/performance` | GET | JWT | Hospital utilization stats |
| `/system-health` | GET | JWT | Audit logs & Error rates |

## 💳 Cards & Membership (`/api/cards`, `/api/memberships`)
| Endpoint | Method | Security | Description |
| :--- | :--- | :--- | :--- |
| `/cards/:cardNumber` | GET | Public* | Public card verification |
| `/memberships/plans` | GET | Public | List available membership tiers |

## 💰 Finance & Settlements (`/api/finance`)
| Endpoint | Method | Security | Description |
| :--- | :--- | :--- | :--- |
| `/coupons/validate` | POST | JWT | Validate discount codes |
| `/hospital-settlements`| GET | JWT | Track payouts to hospitals |
| `/executive-commissions`| GET | JWT | Track commission payouts |
