import { prisma } from "@/lib/db";
import { headers } from "next/headers";

export default async function AdminDashboard() {
  const reqHeaders = await headers();
  const role = reqHeaders.get("x-user-role");

  const totalOrders = await prisma.order.count();
  const totalRevenue = await prisma.order.aggregate({
    _sum: { total_price_cents: true }
  });
  
  const revenueStr = ((totalRevenue._sum.total_price_cents || 0) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="mx-auto px-4 lg:px-6 py-8" style={{ maxWidth: '1200px' }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-on-surface">
            Dashboard<span className="text-primary">.</span>
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">Visão geral da sua loja</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge-success">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
            Online
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="glass-card p-5 bg-white border-l-2 border-l-primary">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-on-surface-variant text-[10px] font-semibold uppercase tracking-wider">Pedidos Totais</h3>
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#009739" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-on-surface">{totalOrders}</p>
          <p className="text-[10px] text-primary mt-1">+12% este mês</p>
        </div>
        
        <div className="glass-card p-5 bg-white border-l-2 border-l-secondary">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-on-surface-variant text-[10px] font-semibold uppercase tracking-wider">Faturamento</h3>
            <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E6C200" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-on-surface">{revenueStr}</p>
          <p className="text-[10px] text-primary mt-1">+8% este mês</p>
        </div>
        
        <div className="glass-card p-5 bg-white border-l-2 border-l-error">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-on-surface-variant text-[10px] font-semibold uppercase tracking-wider">Estoque Crítico</h3>
            <div className="w-8 h-8 bg-error/10 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D32F2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-on-surface">0</p>
          <p className="text-[10px] text-on-surface-variant mt-1">Todos em estoque</p>
        </div>
      </div>

      <div className="glass-card p-6 bg-white mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-on-surface">Pedidos Recentes</h2>
          <a href="#" className="text-xs text-primary hover:underline">Ver todos</a>
        </div>
        <div className="text-center py-8 text-on-surface-variant">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3 text-outline"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          <p className="text-sm">Nenhum pedido realizado ainda</p>
        </div>
      </div>

      <div className="glass-card p-6 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#009739" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-on-surface">Gerenciar Estoque</h2>
            <p className="text-xs text-on-surface-variant">Controle de produtos e tamanhos</p>
          </div>
        </div>
        <p className="text-on-surface-variant text-xs">
          Aqui o Administrador poderá realizar upload de imagens para a CDN, cadastrar preços e controlar a quantidade granular de estoque por tamanho.
        </p>
      </div>
    </div>
  );
}
