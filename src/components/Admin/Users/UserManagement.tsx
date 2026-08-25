import React, { useState } from 'react';
import {
  UserPlus,
  Search,
  Edit2,
  Shield,
  Trash2,
  X,
  UserCheck,
  UserX,
  CheckCircle2,
} from 'lucide-react';
import type { AdminUser, AdminRole } from '../../../types/admin';
import { MOCK_ADMIN_USERS } from '../../../data/adminMockData';

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>(MOCK_ADMIN_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUserForDrawer, setSelectedUserForDrawer] = useState<AdminUser | null>(null);

  // New User Form State
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<AdminRole>('Researcher');
  const [newPassword, setNewPassword] = useState('');

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newEmail) return;

    const newUser: AdminUser = {
      id: `usr-${Date.now()}`,
      name: newFullName,
      email: newEmail,
      role: newRole,
      status: 'Active',
      joinedDate: 'Just now',
      lastLogin: 'Never',
      permissions: ['read_access', 'knowledge_edit'],
    };

    setUsers([newUser, ...users]);
    setNewFullName('');
    setNewEmail('');
    setNewPassword('');
    setIsAddModalOpen(false);
  };

  const handleToggleStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' }
          : u
      )
    );
  };

  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="p-4 rounded-2xl bg-[#111827] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div className="flex gap-1 overflow-x-auto">
            {['All', 'Super Admin', 'Admin', 'Researcher', 'Expert', 'Viewer'].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  roleFilter === role
                    ? 'bg-[#102A56] text-[#60A5FA] border border-[#2563EB]/40'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full md:w-auto py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-xs transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Administrator / User</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl bg-[#111827] border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 font-mono uppercase text-[10px] bg-black/30">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Joined Date</th>
                <th className="py-3 px-4">Last Login</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0B1F3A] border border-[#2563EB]/50 flex items-center justify-center text-[#60A5FA] font-bold text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-bold text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-gray-300">{user.email}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        user.role === 'Super Admin'
                          ? 'bg-[#2563EB]/20 text-[#60A5FA] border border-[#2563EB]/40'
                          : user.role === 'Admin'
                          ? 'bg-[#102A56] text-[#60A5FA] border border-[#2563EB]/30'
                          : 'bg-white/10 text-gray-300'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        user.status === 'Active'
                          ? 'bg-[#2563EB]/20 text-[#60A5FA] border border-[#2563EB]/30'
                          : 'bg-red-950/80 text-red-400 border border-red-500/30'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          user.status === 'Active' ? 'bg-[#60A5FA]' : 'bg-red-400'
                        }`}
                      />
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-gray-400">{user.joinedDate}</td>
                  <td className="py-3.5 px-4 font-mono text-gray-400">{user.lastLogin}</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedUserForDrawer(user)}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white"
                        title="View & Edit Permissions"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-gray-300 hover:text-[#60A5FA]"
                        title={user.status === 'Active' ? 'Deactivate Account' : 'Activate Account'}
                      >
                        {user.status === 'Active' ? (
                          <UserX className="w-3.5 h-3.5 text-amber-400" />
                        ) : (
                          <UserCheck className="w-3.5 h-3.5 text-[#60A5FA]" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-gray-300 hover:text-red-400"
                        title="Delete User"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleAddUser}
            className="w-full max-w-md bg-[#111827] border border-[#2563EB]/40 rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#60A5FA]" />
                <h3 className="text-base font-bold text-white">Add New Platform Administrator</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  placeholder="e.g. Dr. Naseer Baloch"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="admin@balochidigital.org"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Assign Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as AdminRole)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#2563EB]"
                >
                  <option value="Admin">Admin</option>
                  <option value="Researcher">Researcher</option>
                  <option value="Expert">Expert</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Initial Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-5 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-xs transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit User Permissions Drawer */}
      {selectedUserForDrawer && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-[#070B14] border-l border-white/10 h-full p-6 space-y-5 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0B1F3A] border border-[#2563EB]/40 flex items-center justify-center text-[#60A5FA] font-bold text-sm">
                    {selectedUserForDrawer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{selectedUserForDrawer.name}</h3>
                    <p className="text-xs text-gray-400 font-mono">{selectedUserForDrawer.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedUserForDrawer(null)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#111827] border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Role</span>
                  <span className="font-bold text-[#60A5FA]">{selectedUserForDrawer.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Account Status</span>
                  <span className="font-bold text-white">{selectedUserForDrawer.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Joined Date</span>
                  <span className="font-mono text-gray-300">{selectedUserForDrawer.joinedDate}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-white uppercase tracking-wider text-[10px] text-gray-400">
                  Granted Administrative Permissions
                </h4>
                {['knowledge_edit', 'ocr_approval', 'dictionary_review', 'user_management'].map((perm) => (
                  <div key={perm} className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between">
                    <span className="font-mono text-gray-300">{perm}</span>
                    <CheckCircle2 className="w-4 h-4 text-[#60A5FA]" />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedUserForDrawer(null)}
              className="w-full py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold text-xs transition-colors"
            >
              Save Permission Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
