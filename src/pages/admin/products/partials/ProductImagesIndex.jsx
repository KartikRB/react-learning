import { useEffect, useState, useRef } from "react";
import DataTable from "react-data-table-component";
import DataTableStyle from "../../../../components/admin/DataTableStyle";
import api from "../../../../api/Axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Image from "../../../../components/Image"
import BASE_URL from "../../../../config";

const ProductImagesIndex = ({productId}) => {
  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  
  const fetchProductImages = async () => {
    setLoading(true);
    try {
      const response = await api.get("/products/" + productId);
      if (response.data.status) {
        const images = response.data.data.images.filter(
            image => image.is_primary === 0
        );
        setData(images);
      }
    } catch (error) {
        console.error("Error fetching product images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductImages();
  }, []);

  const columns = [
    {
      name: "Sr No.",
      cell: (row, index) => index + 1,
      width: "80px",
    },
    { id: "order", name: "order", selector: row => row.order, sortable: true , omit: true},
    {
      name: "Image",
      sortable: false,
      cell: row => (
        row.path ? (
          <Image
            src={`${BASE_URL}/storage/${row.path}`}
            alt="Image"
            width="200px"
            height="150px"
          />
        ) : (<Image
              src="/images/default_product.png" 
              alt="icon"
              width="200px"
              height="150px"
              className="border border-secondary border-2"
          />)
      )
    }, 
    {
      name: "Actions",
      sortable: false,
      cell: row => (
        <div style={{ display: "flex", gap: "5px" }}>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(row.id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
      )
    }
  ];

  const handleUploadImages = async (e) => {
    setErrors({});

    const files = e.target.files;
  
    if (!files || files.length === 0) {
      toast.error("Please select images");
      return;
    }
  
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append("images[]", file);
    });
  
    setUploading(true);
    try {
      const response = await api.post(
        `/products/${productId}/upload-images`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.data.status) {
        toast.success(response.data.message || "Images uploaded successfully!");
        fetchProductImages();
        fileInputRef.current.value = "";
      } else {
        toast.error(response.data.message || "Upload failed");
      }
    } catch (error) {
        if (error.response?.status === 422) {
            setErrors(error.response.data.errors);
        } else {
            toast.error("Failed to upload images");
        }
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to revert this!",
      icon: "warning",
      showCancelButton: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await api.delete(`/products/${id}/remove-product-image`);
          if (response.data.status) {
            toast.success(response.data.message || "Product image deleted successfully!");
            fetchProductImages();
          } else {
            toast.error(response.data.message || "Product image not found!");
          }
        } catch (err) {
          toast.error("Failed to delete product image");
        }
      }
    });
  };  

  return (
    <div>
        <div className="mb-3 gap-2">
            <input
                type="file"
                ref={fileInputRef}
                className={`form-control ${Object.keys(errors).some(key => key.startsWith("images")) ? "is-invalid" : ""}`}
                multiple
                accept="image/*"
                onChange={handleUploadImages}
                disabled={uploading}
            />

            {uploading && (
                <span className="text-primary">Uploading...</span>
            )}

            {errors && Object.keys(errors).length > 0 && (
            <div>
                {Object.values(errors).flat().map((msg, idx) => (
                <div className="invalid-feedback d-block" key={idx}>
                    {msg}
                </div>
                ))}
            </div>
            )}
        </div>
        <div className="table-responsive">
            <DataTable
                columns={columns}
                data={data}
                customStyles={DataTableStyle()}
                pagination
                progressPending={loading}
                defaultSortFieldId="order"
                defaultSortAsc={true}
            />
        </div>
    </div>
  );
};

export default ProductImagesIndex;