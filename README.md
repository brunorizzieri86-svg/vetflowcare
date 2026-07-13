# vetflowcare
VetFlowCare - Aplicativo para organizar, conectar e cuidar da saúde dos seus pets.
# 🐾 VetFlowCare Pro v4.0

**Organiza · Conecta · Cuida** — Gestão veterinária completa como PWA (funciona offline e instala na tela inicial).

## 📁 Arquivos do repositório

| Arquivo | Função |
|---|---|
| `index.html` | O aplicativo completo (HTML + CSS + JS em arquivo único) |
| `manifest.json` | Configuração do PWA (nome, ícone, cores) |
| `sw.js` | Service Worker — funcionamento offline |
| `logo.jpg` | Seu logo (mantenha o que já está no repositório) |

## 🚀 Como publicar no GitHub Pages

1. Abra seu repositório `vetflowcare` no GitHub
2. Substitua o `index.html` antigo pelo novo (botão *Add file → Upload files*)
3. Envie também `manifest.json` e `sw.js` para a **raiz** do repositório
4. Mantenha o `logo.jpg` que já existe
5. Aguarde ~1 minuto e acesse: `https://SEU-USUARIO.github.io/vetflowcare/`

> Dica: se o app antigo aparecer, feche todas as abas e reabra — ou limpe o cache do navegador (o Service Worker novo assume na segunda visita).

## ✨ Novidades da v4.0 Pro

- 👨‍⚕️ **Perfil do Profissional**: nome completo, CRMV (UF + número), SIPEAGRO/MAPA, e-mail
- 🖼️ **Upload de logo e assinatura eletrônica** — usados na impressão
- 📝 **Receituário digital** com impressão timbrada (logo + dados + assinatura)
- 📋 **Prontuário clínico** nas consultas (anamnese, diagnóstico, conduta) com impressão
- ⚧ Campo de **fertilidade** (Fértil / Castrado)
- 👤 Campo de **tutor/responsável** por paciente
- 🐕🐈🦜 Espécies simplificadas: **Cão, Gato e Ave** (vacinas sugeridas por espécie)
- 💉 **Antirrábica única** para cães e gatos (sem "Raiva Felina")
- ❌ Removidos: Antiparasitas, Estética e perfis de família

## 💾 Dados

- Tudo é salvo **no dispositivo** (localStorage) — sem servidor, sem mensalidade
- Backup: *Ajustes → Exportar Dados (JSON)*
- Migração automática: dados das versões anteriores (v2/v3) são importados na primeira abertura
- 
