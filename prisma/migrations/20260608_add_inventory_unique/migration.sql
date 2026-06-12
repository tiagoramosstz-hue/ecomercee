-- AddUniqueConstraint
CREATE UNIQUE INDEX "inventory_product_id_size_key" ON "inventory"("product_id", "size");
