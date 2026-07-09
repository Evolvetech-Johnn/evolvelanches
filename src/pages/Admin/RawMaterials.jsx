import React, { useState } from 'react';
import { useStock } from '../../contexts/StockContext';
import { Plus, Edit, Trash, AlertTriangle, Save, X, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RawMaterials = () => {
    const { stockItems, addStockItem, updateStockItem, deleteStockItem, addQuantity } = useStock();
    const navigate = useNavigate();
    
    // State for modals/forms
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingStock, setIsAddingStock] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [formData, setFormData] = useState({ name: '', quantity: 0, unit: '', minThreshold: 0 });
    const [addStockAmount, setAddStockAmount] = useState('');

    const handleEdit = (item) => {
        setCurrentItem(item);
        setFormData(item);
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setCurrentItem(null);
        setFormData({ name: '', quantity: 0, unit: '', minThreshold: 0 });
        setIsEditing(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (currentItem) {
            updateStockItem(currentItem.id, formData);
        } else {
            addStockItem(formData);
        }
        setIsEditing(false);
    };

    const handleOpenAddStock = (item) => {
        setCurrentItem(item);
        setAddStockAmount('');
        setIsAddingStock(true);
    };

    const handleSaveStock = (e) => {
        e.preventDefault();
        if (currentItem && addStockAmount) {
            addQuantity(currentItem.id, parseFloat(addStockAmount));
            setIsAddingStock(false);
        }
    };

    return (
        <div>
            <div className="section-header-admin">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button 
                        className="btn btn-outline btn-sm"
                        onClick={() => navigate('/admin')}
                    >
                        Voltar
                    </button>
                    <h1>Controle de Estoque (Matéria Prima)</h1>
                </div>
                <button 
                    className="btn btn-primary btn-sm"
                    onClick={handleAddNew}
                >
                    <Plus size={16} /> Novo Item
                </button>
            </div>

            <div className="admin-section" style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-accent)' }}>
                
                {/* Summary Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ background: 'var(--bg-body)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-accent)' }}>
                        <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total de Itens</h4>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{stockItems.length}</p>
                    </div>
                    <div style={{ background: 'var(--bg-body)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-accent)' }}>
                        <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Itens com Estoque Baixo</h4>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>
                            {stockItems.filter(i => i.quantity <= i.minThreshold).length}
                        </p>
                    </div>
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-main)' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--color-accent)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem' }}>Item</th>
                                <th style={{ padding: '1rem' }}>Quantidade Atual</th>
                                <th style={{ padding: '1rem' }}>Unidade</th>
                                <th style={{ padding: '1rem' }}>Mínimo (Alerta)</th>
                                <th style={{ padding: '1rem' }}>Status</th>
                                <th style={{ padding: '1rem', textAlign: 'right' }}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stockItems.map(item => {
                                const isLow = item.quantity <= item.minThreshold;
                                return (
                                    <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '1rem', fontWeight: '500' }}>{item.name}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{item.quantity}</span>
                                        </td>
                                        <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{item.unit}</td>
                                        <td style={{ padding: '1rem' }}>{item.minThreshold}</td>
                                        <td style={{ padding: '1rem' }}>
                                            {isLow ? (
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                                                    <AlertTriangle size={14} /> Baixo
                                                </span>
                                            ) : (
                                                <span style={{ color: '#4ade80', background: 'rgba(74, 222, 128, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.8rem' }}>
                                                    OK
                                                </span>
                                            )}
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                                <button 
                                                    className="btn btn-primary btn-sm"
                                                    title="Adicionar Estoque"
                                                    onClick={() => handleOpenAddStock(item)}
                                                >
                                                    <Plus size={16} />
                                                </button>
                                                <button 
                                                    className="btn btn-outline btn-sm"
                                                    title="Editar"
                                                    onClick={() => handleEdit(item)}
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button 
                                                    className="btn btn-outline btn-sm"
                                                    style={{ borderColor: '#ef4444', color: '#ef4444' }}
                                                    title="Excluir"
                                                    onClick={() => {
                                                        if(window.confirm('Tem certeza que deseja excluir este item?')) {
                                                            deleteStockItem(item.id);
                                                        }
                                                    }}
                                                >
                                                    <Trash size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit/Create Modal */}
            {isEditing && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '500px', border: '1px solid var(--color-accent)' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>{currentItem ? 'Editar Item' : 'Novo Item'}</h3>
                        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Nome do Item</label>
                                <input 
                                    type="text" 
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                    required
                                    style={{ width: '100%', padding: '0.8rem', background: 'var(--bg-input)', border: '1px solid var(--color-accent)', borderRadius: 'var(--radius-md)', color: 'var(--text-main)' }}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Quantidade</label>
                                    <input 
                                        type="number" 
                                        step="0.01"
                                        value={formData.quantity}
                                        onChange={e => setFormData({...formData, quantity: parseFloat(e.target.value)})}
                                        required
                                        style={{ width: '100%', padding: '0.8rem', background: 'var(--bg-input)', border: '1px solid var(--color-accent)', borderRadius: 'var(--radius-md)', color: 'var(--text-main)' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Unidade (ex: kg, un)</label>
                                    <input 
                                        type="text" 
                                        value={formData.unit}
                                        onChange={e => setFormData({...formData, unit: e.target.value})}
                                        required
                                        style={{ width: '100%', padding: '0.8rem', background: 'var(--bg-input)', border: '1px solid var(--color-accent)', borderRadius: 'var(--radius-md)', color: 'var(--text-main)' }}
                                    />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Estoque Mínimo (Alerta)</label>
                                <input 
                                    type="number" 
                                    step="0.01"
                                    value={formData.minThreshold}
                                    onChange={e => setFormData({...formData, minThreshold: parseFloat(e.target.value)})}
                                    required
                                    style={{ width: '100%', padding: '0.8rem', background: 'var(--bg-input)', border: '1px solid var(--color-accent)', borderRadius: 'var(--radius-md)', color: 'var(--text-main)' }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setIsEditing(false)}>Cancelar</button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Stock Modal */}
            {isAddingStock && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '400px', border: '1px solid var(--color-accent)' }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>Adicionar Estoque</h3>
                        <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                            Adicionando para: <strong>{currentItem?.name}</strong>
                        </p>
                        <form onSubmit={handleSaveStock} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Quantidade a Adicionar ({currentItem?.unit})</label>
                                <input 
                                    type="number" 
                                    step="0.01"
                                    value={addStockAmount}
                                    onChange={e => setAddStockAmount(e.target.value)}
                                    required
                                    autoFocus
                                    style={{ width: '100%', padding: '0.8rem', background: 'var(--bg-input)', border: '1px solid var(--color-accent)', borderRadius: 'var(--radius-md)', color: 'var(--text-main)', fontSize: '1.2rem' }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setIsAddingStock(false)}>Cancelar</button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Confirmar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RawMaterials;
