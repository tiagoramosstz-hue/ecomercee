#!/bin/bash
# run from project root: bash scripts/rename-images.sh
# Renames all shirt images in public/images/ to kebab-case

cd "$(dirname "$0")/.." || exit 1

IMG_DIR="public/images"

declare -A RENAMES=(
  ["camisa_Franca.png"]="camisa-franca.png"
  ["camisa_Alemanha.png"]="camisa-alemanha.png"
  ["camisa Argentina.png"]="camisa-argentina.png"
  ["camisa Brazil.png"]="camisa-brasil.png"
  ["camisa Brasil.png"]="camisa-brasil.png"
  ["camisa Japao.png"]="camisa-japao.png"
  ["camisa Japão.png"]="camisa-japao.png"
  ["camisa Corea do Norte.png"]="camisa-coreia-norte.png"
  ["camisa Coreia do Norte.png"]="camisa-coreia-norte.png"
  ["camisa Nova Zelandia.png"]="camisa-nova-zelandia.png"
  ["camisa Nova Zelândia.png"]="camisa-nova-zelandia.png"
  ["camisa Iram.png"]="camisa-ira.png"
  ["camisa Irã.png"]="camisa-ira.png"
  ["camisa Mexico.png"]="camisa-mexico.png"
  ["camisa México.png"]="camisa-mexico.png"
  ["camisa EUA.png"]="camisa-eua.png"
  ["camisa Canada.png"]="camisa-canada.png"
  ["camisa Canadá.png"]="camisa-canada.png"
  ["camisa Portugal.png"]="camisa-portugal.png"
  ["camisa Republica Theca.png"]="camisa-republica-tcheca.png"
  ["camisa República Tcheca.png"]="camisa-republica-tcheca.png"
  ["camisa Croacia.png"]="camisa-croacia.png"
  ["camisa Croácia.png"]="camisa-croacia.png"
  ["camisa Uruguai.png"]="camisa-uruguai.png"
  ["camisa Paraguai.png"]="camisa-paraguai.png"
  ["camisa Colombia.png"]="camisa-colombia.png"
  ["camisa Colômbia.png"]="camisa-colombia.png"
  ["camisa Belgica.png"]="camisa-belgica.png"
  ["camisa Bélgica.png"]="camisa-belgica.png"
  ["camisa Inglaterra.png"]="camisa-inglaterra.png"
  ["camisa Marrocos.png"]="camisa-marrocos.png"
  ["camisa Africa do Sul.png"]="camisa-africa-sul.png"
  ["camisa África do Sul.png"]="camisa-africa-sul.png"
  ["camisa Haiti.png"]="camisa-haiti.png"
  ["camisa_Franca.jpg"]="camisa-franca.png"
  ["camisa_Alemanha.jpg"]="camisa-alemanha.png"
)

echo "🔄 Renaming images in $IMG_DIR..."

for OLD in "${!RENAMES[@]}"; do
  NEW="${RENAMES[$OLD]}"
  SRC="$IMG_DIR/$OLD"
  DST="$IMG_DIR/$NEW"
  if [ -f "$SRC" ]; then
    mv "$SRC" "$DST"
    echo "  ✅ $OLD → $NEW"
  fi
done

echo "✅ Done renaming images."
echo ""
echo "Current files in $IMG_DIR:"
ls "$IMG_DIR"
