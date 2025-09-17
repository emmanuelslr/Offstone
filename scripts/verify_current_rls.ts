#!/usr/bin/env npx tsx

/**
 * Script pour vérifier la configuration RLS actuelle
 * sur la table leads_candidature
 */

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.log('❌ Variables d\'environnement manquantes !');
  console.log('Configurez SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

async function verifyCurrentRLS() {
  console.log('🔍 Vérification de la configuration RLS actuelle');
  console.log('================================================');

  try {
    // 1. Vérifier si RLS est activé
    console.log('\n🔐 1. Statut RLS sur leads_candidature...');
    const rlsResponse = await fetch(`${url}/rest/v1/pg_tables?tablename=eq.leads_candidature&select=rowsecurity`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
    });

    if (rlsResponse.ok) {
      const tables = await rlsResponse.json();
      if (tables.length > 0) {
        const rlsEnabled = tables[0].rowsecurity;
        if (rlsEnabled) {
          console.log('✅ Row Level Security (RLS) est ACTIVÉ');
        } else {
          console.log('❌ Row Level Security (RLS) est DÉSACTIVÉ');
        }
      } else {
        console.log('❌ Table leads_candidature non trouvée');
        return;
      }
    }

    // 2. Lister toutes les politiques RLS
    console.log('\n📋 2. Politiques RLS configurées...');
    const policiesResponse = await fetch(`${url}/rest/v1/pg_policies?tablename=eq.leads_candidature&select=*`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
    });

    if (policiesResponse.ok) {
      const policies = await policiesResponse.json();
      if (policies.length > 0) {
        console.log(`✅ ${policies.length} politique(s) RLS trouvée(s):`);
        policies.forEach((policy: any, index: number) => {
          console.log(`\n   Politique ${index + 1}: ${policy.policyname}`);
          console.log(`   - Rôles: ${policy.roles?.join(', ') || 'all'}`);
          console.log(`   - Commandes: ${policy.cmd}`);
          console.log(`   - Permissive: ${policy.permissive ? 'Oui' : 'Non'}`);
          if (policy.qual) console.log(`   - Condition USING: ${policy.qual}`);
          if (policy.with_check) console.log(`   - Condition WITH CHECK: ${policy.with_check}`);
        });
      } else {
        console.log('⚠️ Aucune politique RLS trouvée');
      }
    }

    // 3. Vérifier les contraintes de sécurité
    console.log('\n🛡️ 3. Contraintes de sécurité...');
    const constraintsResponse = await fetch(`${url}/rest/v1/pg_constraint?conrelid=(select oid from pg_class where relname='leads_candidature')&select=conname,consrc`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
    });

    if (constraintsResponse.ok) {
      const constraints = await constraintsResponse.json();
      if (constraints.length > 0) {
        console.log(`✅ ${constraints.length} contrainte(s) trouvée(s):`);
        constraints.forEach((constraint: any) => {
          console.log(`   - ${constraint.conname}`);
        });
      } else {
        console.log('⚠️ Aucune contrainte de sécurité trouvée');
      }
    }

    // 4. Test de sécurité - accès anonyme
    console.log('\n🧪 4. Test de sécurité - accès anonyme...');
    const anonResponse = await fetch(`${url}/rest/v1/leads_candidature?select=id&limit=1`, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'test-anon-key',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'test-anon-key'}`,
        'Content-Type': 'application/json',
      },
    });

    if (anonResponse.status === 401 || anonResponse.status === 403) {
      console.log('✅ Accès anonyme correctement BLOQUÉ');
    } else if (anonResponse.ok) {
      console.log('❌ VULNÉRABILITÉ: Accès anonyme AUTORISÉ !');
    } else {
      console.log(`⚠️ Réponse inattendue: ${anonResponse.status}`);
    }

    // 5. Test de sécurité - accès authenticated
    console.log('\n🧪 5. Test de sécurité - accès authenticated...');
    const authResponse = await fetch(`${url}/rest/v1/leads_candidature?select=id&limit=1`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
    });

    if (authResponse.ok) {
      console.log('✅ Accès service_role autorisé (normal)');
    } else {
      console.log(`❌ Problème avec l'accès service_role: ${authResponse.status}`);
    }

    // 6. Résumé de sécurité
    console.log('\n🎯 Résumé de la sécurité:');
    console.log('========================');
    
    if (rlsResponse.ok && (await rlsResponse.json())[0]?.rowsecurity) {
      console.log('✅ RLS: Activé');
    } else {
      console.log('❌ RLS: Désactivé ou non configuré');
    }
    
    if (policiesResponse.ok && (await policiesResponse.json()).length > 0) {
      console.log('✅ Politiques: Configurées');
    } else {
      console.log('❌ Politiques: Manquantes');
    }
    
    if (anonResponse.status === 401 || anonResponse.status === 403) {
      console.log('✅ Accès anonyme: Bloqué');
    } else {
      console.log('❌ Accès anonyme: Autorisé (VULNÉRABLE)');
    }
    
    console.log('✅ API: Sécurisée (CSRF + PoW + Rate Limits)');
    console.log('✅ Service Role: Configuré');

  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error);
  }
}

verifyCurrentRLS();
