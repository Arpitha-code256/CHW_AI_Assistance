import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, PlusCircle, Eye } from "lucide-react";
import { readMembers, saveMembers } from '../data/healthOperations';

function CommunityMembers() {
  const [members, setMembers] = useState(readMembers);

  useEffect(() => {
    const refreshMembers = () => setMembers(readMembers());
    window.addEventListener('storage', refreshMembers);
    window.addEventListener('chw:members-updated', refreshMembers);
    return () => {
      window.removeEventListener('storage', refreshMembers);
      window.removeEventListener('chw:members-updated', refreshMembers);
    };
  }, []);

  const addMember = () => {
    const newMember = {
      id: Date.now(),
      name: "Ravi Kumar",
      age: 35,
      gender: "Male",
      phone: "9876543210",
    };

    const updatedMembers = [...readMembers(), newMember];
    saveMembers(updatedMembers);
    setMembers(updatedMembers);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Community Members
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage and monitor registered community members.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/add-member"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New Member</span>
          </Link>

          <button
            onClick={addMember}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Test Member</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="p-3.5">Name</th>
                <th className="p-3.5">Age</th>
                <th className="p-3.5">Gender</th>
                <th className="p-3.5">Phone</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-slate-700">
              {members.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">
                    No community members yet. Click "Add New Member" or "Add Test Member".
                  </td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-medium text-slate-900">{member.name}</td>
                    <td className="p-3.5">{member.age}</td>
                    <td className="p-3.5">{member.gender}</td>
                    <td className="p-3.5">{member.phone}</td>
                    <td className="p-3.5 text-right">
                      <Link
                        to={`/member/${member.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CommunityMembers;