import React, { useState, useEffect } from "react";
import { useResourceQueries } from "../../js/resources.js";
import "./RecipeProductResource.css";

const RecipeProductResource = ({ type }) => {
  const {
    getResource,
    addResourceMutation,
    editResourceMutation,
    deleteResourceMutation,
  } = useResourceQueries(type);

  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [newResourceName, setNewResourceName] = useState("");
  const [editingResource, setEditingResource] = useState(false);
  const [resourceIdToEdit, setResourceIdToEdit] = useState("");
  const [addingResource, setAddingResource] = useState(false);
  const [deletingResource, setDeletingResource] = useState(false);
  const [resourceIdToDelete, setResourceIdToDelete] = useState("");


  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = resources.filter((resource) =>
      resource.name.toLowerCase().includes(searchValue)
    );
   
    setFilteredResources(filtered);
  };

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await getResource();
        setResources(data);
  
        const filtered = data.filter(resource =>
          resource.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredResources(filtered);
  
        if (filtered.length > 0) {
          setSelectedResource(filtered[0].id);
        } else {
          setSelectedResource("");
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };
  
    fetchResources();
  }, [type, getResource, searchTerm]);
  
  const handleResourceChange = (e) => {
    setSelectedResource(e.target.value);
  };


  const handleAddResource = async () => {
    try {
      await addResourceMutation.mutateAsync(newResourceName);
      setNewResourceName("");
      alert(`Successfully added ${type}`);
      const data = await getResource(); 
      setResources(data);
      setFilteredResources(data);
    } catch (error) {
      console.error("Error adding resource:", error);
    }
  };

  const handleEditResource = async () => {
    try {
      await editResourceMutation.mutateAsync({
        resourceId: resourceIdToEdit,
        newResourceName,
      });
      setNewResourceName("");
      setEditingResource(false);
      alert(`Successfully edited ${type}`);
      const data = await getResource(); 
      setResources(data);
      setFilteredResources(data);
    } catch (error) {
      console.error("Error editing resource:", error);
    }
  };

  const handleDeleteResource = async () => {
    try {
      await deleteResourceMutation.mutateAsync(resourceIdToDelete);
      setDeletingResource(false);
      alert(`Successfully deleted ${type}`);
      const data = await getResource(); 
      setResources(data);
      setFilteredResources(data);
    } catch (error) {
      console.error("Error deleting resource:", error);
    }
  };

  return (
    <div className="opt-container">
      <h1>{type.toUpperCase()}</h1>

      <div className="option-search">
      <input
        type="text"
        placeholder={`Search ${type}`}
        value={searchTerm}
        onChange={handleSearchChange}
      />
        <select value={selectedResource} onChange={handleResourceChange}>
        {filteredResources.map((resource) => (
          <option key={resource.id} value={resource.id}>
            {resource.name} - id:{resource.id}
          </option>
        ))}
      </select>
      </div>

      {editingResource ? (
        <div className="option-resource">
          <input
            type="text"
            placeholder="Resource ID"
            value={resourceIdToEdit}
            onChange={(e) => setResourceIdToEdit(e.target.value)}
          />
          <input
            type="text"
            placeholder={`New ${type} name`}
            value={newResourceName}
            onChange={(e) => setNewResourceName(e.target.value)}
          />
          <button onClick={handleEditResource}>Edit {type}</button>
        </div>
      ) : (
        <div className="option-btn">
          <button
            onClick={() => {
              setResourceIdToEdit(selectedResource);
              setEditingResource(true);
            }}
          >
            Edit {type}
          </button>
        </div>
      )}

      <div className="option-btn">
        <button onClick={() => setAddingResource(true)}>Add {type}</button>
      </div>
      {addingResource && (
        <div className="option-resource">
          <input
            type="text"
            placeholder={`New ${type} name`}
            value={newResourceName}
            onChange={(e) => setNewResourceName(e.target.value)}
          />
          <button onClick={handleAddResource}>Add {type}</button>
        </div>
      )}

      <div className="option-btn">
        <button onClick={() => setDeletingResource(true)}>Delete {type}</button>
      </div>
      {deletingResource && (
        <div className="option-resource">
          <input
            type="text"
            placeholder="Resource ID"
            value={resourceIdToDelete}
            onChange={(e) => setResourceIdToDelete(e.target.value)}
          />
          <button onClick={handleDeleteResource}>Delete {type}</button>
        </div>
      )}
    </div>
  );
};

export default RecipeProductResource;
