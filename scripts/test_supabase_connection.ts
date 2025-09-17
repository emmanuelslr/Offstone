#!/usr/bin/env tsx

// Script de diagnostic pour tester la connexion Supabase
import { config } from 'dotenv';

// Charger les variables d'environnement
config();

async function testSupabaseConnection() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  console.log('🔍 Diagnostic Supabase');
  console.log('====================');
  console.log(`URL: ${url ? '✅ Définie' : '❌ Manquante'}`);
  console.log(`Service Role Key: ${key ? '✅ Définie' : '❌ Manquante'}`);
  
  if (!url || !key) {
    console.log('\n❌ Variables d\'environnement manquantes !');
    return;
  }

  try {
    // Test 1: Vérifier la connexion de base
    console.log('\n🔗 Test de connexion...');
    const healthResponse = await fetch(`${url}/rest/v1/`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    });
    
    if (healthResponse.ok) {
      console.log('✅ Connexion Supabase OK');
    } else {
      console.log(`❌ Erreur de connexion: ${healthResponse.status}`);
      return;
    }

    // Test 2: Vérifier si la table existe
    console.log('\n📋 Test de la table leads_candidature...');
    const tableResponse = await fetch(`${url}/rest/v1/leads_candidature?select=count`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    });

    if (tableResponse.ok) {
      console.log('✅ Table leads_candidature existe');
      const data = await tableResponse.json();
      console.log(`📊 Nombre d'enregistrements: ${data.length}`);
    } else {
      console.log(`❌ Table leads_candidature non trouvée: ${tableResponse.status}`);
      const errorText = await tableResponse.text();
      console.log(`Détails: ${errorText}`);
    }

    // Test 3: Lister les tables disponibles
    console.log('\n📋 Tables disponibles...');
    const tablesResponse = await fetch(`${url}/rest/v1/`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    });
    
    if (tablesResponse.ok) {
      const tables = await tablesResponse.json();
      console.log('Tables disponibles:', Object.keys(tables));
    }

  } catch (error) {
    console.log(`❌ Erreur: ${error}`);
  }
}

testSupabaseConnection();
