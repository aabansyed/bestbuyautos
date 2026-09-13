-- ============================================================
-- Run this once in Supabase Dashboard -> SQL Editor -> New query
-- ============================================================

create table if not exists public.cars (
  id bigint generated always as identity primary key,
  brand text not null,
  name text not null,
  year int not null,
  price numeric not null,
  mileage numeric not null default 0,
  fuel text not null default 'Petrol',        -- Petrol / Diesel / Hybrid / Electric
  trans text not null default 'Automatic',    -- Automatic / Manual / CVT
  body text not null default 'Sedan',         -- Sedan / SUV / Coupe / Van / Hatchback / Truck / Wagon
  color text not null default '',
  engine text not null default '',
  hp int not null default 0,
  badge text not null default '',             -- '', 'New', 'Hot', 'Premium'
  description text not null default '',
  images text[] not null default '{}',        -- array of image URLs (first = cover image)
  in_stock boolean not null default true,     -- toggle to show/hide from the public site
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- keep updated_at fresh on every edit
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists cars_set_updated_at on public.cars;
create trigger cars_set_updated_at
  before update on public.cars
  for each row execute function public.set_updated_at();

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.cars enable row level security;

-- Anyone (including logged-out visitors) can read in-stock cars —
-- this is what the public website's inventory grid uses.
drop policy if exists "Public can read in-stock cars" on public.cars;
create policy "Public can read in-stock cars"
  on public.cars for select
  using (in_stock = true);

-- Any logged-in user can read every car (including hidden/out-of-stock ones)
-- — this is what the admin panel uses. Since there's no public sign-up
-- form in this app, the only account(s) that can log in are whichever
-- you create yourself in Supabase Dashboard -> Authentication -> Users.
drop policy if exists "Authenticated can read all cars" on public.cars;
create policy "Authenticated can read all cars"
  on public.cars for select
  to authenticated
  using (true);

drop policy if exists "Authenticated can insert cars" on public.cars;
create policy "Authenticated can insert cars"
  on public.cars for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated can update cars" on public.cars;
create policy "Authenticated can update cars"
  on public.cars for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can delete cars" on public.cars;
create policy "Authenticated can delete cars"
  on public.cars for delete
  to authenticated
  using (true);

-- ============================================================
-- Storage bucket for car images (create once)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('car-images', 'car-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can view car images" on storage.objects;
create policy "Public can view car images"
  on storage.objects for select
  using (bucket_id = 'car-images');

drop policy if exists "Authenticated can upload car images" on storage.objects;
create policy "Authenticated can upload car images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'car-images');

drop policy if exists "Authenticated can delete car images" on storage.objects;
create policy "Authenticated can delete car images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'car-images');

-- ============================================================
-- Seed data — the 12 cars that used to be hardcoded on the site.
-- Safe to delete this block if you'd rather start from an empty table.
-- ============================================================
insert into public.cars (brand, name, year, price, mileage, fuel, trans, body, color, engine, hp, badge, description, images)
values
('Toyota','Land Cruiser 200 GX-R',2021,52000,38000,'Petrol','Automatic','SUV','White','4.0L V6',270,'Premium','The ultimate go-anywhere vehicle. Legendary reliability, luxury interior, advanced 4WD. Perfect for African roads.',
  array['https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800','https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400','https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400']),
('Lexus','LX 570 Executive',2022,78000,12000,'Petrol','Automatic','SUV','Black','5.7L V8',383,'Hot','Pinnacle of luxury SUVs. Buttery smooth ride, opulent interior, unmatched refinement. Mark of prestige worldwide.',
  array['https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800','https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=400','https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400']),
('Nissan','Patrol Y62 Platinum',2020,44000,55000,'Petrol','Automatic','SUV','Silver','5.6L V8',400,'New','Dominating roads since decades. The Patrol Y62 offers raw power, massive presence, and desert-ready capability.',
  array['https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800','https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400','https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400']),
('Toyota','Prius G Touring',2022,16500,22000,'Hybrid','CVT','Sedan','Blue','1.8L Hybrid',122,'New','Japan''s most iconic hybrid. Exceptional fuel economy, smooth CVT, and futuristic styling. Ideal for eco-conscious drivers.',
  array['https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800','https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400','https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400']),
('BMW','X5 xDrive40i M Sport',2021,65000,28000,'Petrol','Automatic','SUV','Black','3.0L TwinPower',335,'Premium','Sports Activity Vehicle perfected. The X5 M Sport combines athletic performance with everyday luxury.',
  array['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800','https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400','https://images.unsplash.com/photo-1542362567-b07e54358753?w=400']),
('Honda','Vezel Hybrid RU3',2020,11200,41000,'Hybrid','CVT','SUV','White','1.5L i-VTEC',131,'','Compact crossover perfection. The Honda Vezel Hybrid offers great city dynamics with impressive fuel efficiency.',
  array['https://images.unsplash.com/photo-1561207332-47ce7c0db50a?w=800','https://images.unsplash.com/photo-1539799139339-50c5fe1519ed?w=400','https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400']),
('Mercedes','G63 AMG Edition 1',2023,195000,5000,'Petrol','Automatic','SUV','Obsidian Black','4.0L V8 Biturbo',577,'Hot','An icon reborn. The G63 AMG combines boxy heritage design with brutal AMG performance.',
  array['https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800','https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400','https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400']),
('Toyota','Alphard Executive',2022,38000,18000,'Hybrid','Automatic','Van','Pearl White','3.5L Hybrid',296,'Premium','Japan''s ultimate executive minivan. Lounge-like interior, business-class comfort, and hybrid efficiency.',
  array['https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800','https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400','https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=400']),
('Subaru','Forester 2.0i-S EyeSight',2021,19500,34000,'Petrol','CVT','SUV','Horizon Blue','2.0L Boxer',156,'','Adventure-ready with Subaru EyeSight safety. Symmetrical AWD, spacious cabin, and excellent visibility.',
  array['https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800','https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400','https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400']),
('Nissan','GTR Premium R35',2019,72000,28000,'Petrol','Automatic','Coupe','Ultimate Metallic Silver','3.8L V6 Twin Turbo',565,'Hot','Godzilla. The legendary R35 GT-R remains one of the world''s fastest production cars.',
  array['https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800','https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400','https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400']),
('Land Rover','Defender 110 X',2023,88000,8000,'Petrol','Automatic','SUV','Gondwana Stone','5.0L V8 Supercharged',518,'New','Reborn icon. The Defender 110 X combines go-anywhere capability with tech-forward luxury.',
  array['https://images.unsplash.com/photo-1561207332-47ce7c0db50a?w=800','https://images.unsplash.com/photo-1539799139339-50c5fe1519ed?w=400','https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400']),
('Mazda','CX-5 Signature 2.5T',2022,29500,15000,'Petrol','Automatic','SUV','Machine Grey','2.5L Turbo',256,'','KODO design at its finest. The CX-5 Signature offers a premium, driver-focused experience.',
  array['https://images.unsplash.com/photo-1542362567-b07e54358753?w=800','https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400','https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400']);
