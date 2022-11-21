
function UserListingTab({ currentTab, setCurrentTab }) {
  return (
    <div className="flex text-m-black border-b my-2 mx-4 font-Roboto-Bold text-xlFontSize">
      <p className={`px-4 py-2 cursor-pointer ${currentTab === 0 && "border-b-2 border-m-green"}`} onClick={() => setCurrentTab(0)}>
        Active
      </p>
      <p className={`px-4 py-2 cursor-pointer ${currentTab === 1 && "border-b-2 border-m-green"}`} onClick={() => setCurrentTab(1)}>
        Inactive
      </p>
    </div>
  );
}

export default UserListingTab;
