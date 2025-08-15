import { useState, useEffect } from 'react';

// 20 Natural landscape images with Arabic descriptions
const naturalImages = [
  // Mountain scenery (8 images)
  {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800',
    name: 'جبال الثلج',
    description: 'Snow-covered mountain peaks with dramatic sky'
  },
  {
    url: 'https://images.unsplash.com/photo-1464822759844-d150b9014e9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800',
    name: 'قمم الجبال',
    description: 'Rocky mountain peaks against blue sky'
  },
  {
    url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800',
    name: 'جبال الضباب',
    description: 'Misty mountain landscape with fog'
  },
  {
    url: 'https://images.unsplash.com/photo-1533310266094-8898a03807dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800',
    name: 'الوديان الخضراء',
    description: 'Green valley surrounded by mountains'
  },
  {
    url: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800',
    name: 'جبال الغروب',
    description: 'Mountain silhouettes at golden hour'
  },
  {
    url: 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800',
    name: 'المرتفعات الصخرية',
    description: 'Rocky highlands with dramatic lighting'
  },
  {
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800',
    name: 'الجبال البعيدة',
    description: 'Distant mountain ranges in layered perspective'
  },
  {
    url: 'https://images.unsplash.com/photo-1506142167881-95188f25d5c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800',
    name: 'قمم الألب',
    description: 'Alpine mountain peaks with clear skies'
  },

  // Forest landscapes (6 images)
  {
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800',
    name: 'الغابات المطيرة',
    description: 'Lush rainforest with towering trees'
  },
  {
    url: 'https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800',
    name: 'أشجار الصنوبر',
    description: 'Tall pine forest with misty atmosphere'
  },
  {
    url: 'https://images.unsplash.com/photo-1574263867128-dd9a5af88cff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800',
    name: 'ممر الغابة',
    description: 'Forest pathway through dense woodland'
  },
  {
    url: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800',
    name: 'الغابة الخضراء',
    description: 'Dense green forest canopy view'
  },
  {
    url: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800',
    name: 'أشجار الخريف',
    description: 'Autumn forest with golden leaves'
  },
  {
    url: 'https://images.unsplash.com/photo-1516736923451-535b262d6ff9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800',
    name: 'غابة البامبو',
    description: 'Serene bamboo forest pathway'
  },

  // Ocean views (6 images)
  {
    url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800',
    name: 'الشاطئ الذهبي',
    description: 'Golden sandy beach with turquoise water'
  },
  {
    url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800',
    name: 'أمواج المحيط',
    description: 'Ocean waves crashing on rocky shore'
  },
  {
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800',
    name: 'البحر الهادئ',
    description: 'Calm sea with gentle waves at sunset'
  },
  {
    url: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800',
    name: 'الجزر الاستوائية',
    description: 'Tropical islands in crystal clear water'
  },
  {
    url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800',
    name: 'الشعاب المرجانية',
    description: 'Coral reefs visible through clear shallow water'
  },
  {
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800',
    name: 'غروب البحر',
    description: 'Spectacular ocean sunset with warm colors'
  }
];

interface LockData {
  keyImage: number | null;
  keyPassword: string | null;
}

export default function KeynovaLock() {
  const [activeTab, setActiveTab] = useState<'verify' | 'settings'>('verify');
  const [selectedVerifyImage, setSelectedVerifyImage] = useState<number | null>(null);
  const [selectedSettingsImage, setSelectedSettingsImage] = useState<number | null>(null);
  const [verifyPassword, setVerifyPassword] = useState('');
  const [setKeyPassword, setSetKeyPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [result, setResult] = useState<{ message: string; type: 'success' | 'fail' | 'warning' } | null>(null);
  const [lockData, setLockData] = useState<LockData>({ keyImage: null, keyPassword: null });

  // Load saved data on component mount
  useEffect(() => {
    const saved = localStorage.getItem('keynovaLock');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setLockData(data);
      } catch (e) {
        console.error('خطأ في قراءة البيانات المحفوظة');
      }
    }
  }, []);

  // Calculate combined hash for image + password
  const calculateCombinedHash = async (imageId: number, password: string): Promise<string | null> => {
    try {
      const combinedData = `image_${imageId}_password_${password}`;
      const encoder = new TextEncoder();
      const data = encoder.encode(combinedData);
      
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (error) {
      console.error("Error calculating hash:", error);
      showResult("حدث خطأ أثناء معالجة البيانات", "fail");
      return null;
    }
  };

  // Save data to localStorage
  const saveData = (data: LockData) => {
    localStorage.setItem('keynovaLock', JSON.stringify(data));
    setLockData(data);
  };

  // Show result message
  const showResult = (message: string, type: 'success' | 'fail' | 'warning') => {
    setResult({ message, type });
    setTimeout(() => setResult(null), 5000);
  };

  // Verify key function
  const verifyKey = async () => {
    if (selectedVerifyImage === null) {
      showResult("يرجى اختيار صورة للتحقق منها", "fail");
      return;
    }

    if (!verifyPassword) {
      showResult("يرجى إدخال كلمة المرور", "fail");
      return;
    }

    // If no key is saved, this becomes the first key
    if (lockData.keyImage === null || lockData.keyPassword === null) {
      const newData = { keyImage: selectedVerifyImage, keyPassword: verifyPassword };
      saveData(newData);
      setIsUnlocked(true);
      showResult("تم تعيين المفتاح الأول بنجاح! مرحباً بك في Keynova Lock", "success");
      return;
    }

    // Verify against saved key
    if (selectedVerifyImage === lockData.keyImage && verifyPassword === lockData.keyPassword) {
      setIsUnlocked(true);
      showResult("تم فتح القفل بنجاح! أهلاً وسهلاً", "success");
    } else {
      showResult("فشل في فتح القفل. تحقق من الصورة وكلمة المرور", "fail");
    }
  };

  // Set new key function
  const setNewKey = () => {
    if (!isUnlocked) {
      showResult("يجب فتح القفل أولاً لتعيين مفتاح جديد", "warning");
      return;
    }

    if (selectedSettingsImage === null) {
      showResult("يرجى اختيار صورة للمفتاح الجديد", "fail");
      return;
    }

    if (!setKeyPassword) {
      showResult("يرجى إدخال كلمة مرور للمفتاح الجديد", "fail");
      return;
    }

    if (setKeyPassword.length < 4) {
      showResult("كلمة المرور يجب أن تكون 4 أحرف على الأقل", "fail");
      return;
    }

    const newData = { keyImage: selectedSettingsImage, keyPassword: setKeyPassword };
    saveData(newData);
    
    showResult("تم تحديث المفتاح بنجاح!", "success");
    setSetKeyPassword('');
    setSelectedSettingsImage(null);
  };

  // Reset key function
  const resetKey = () => {
    if (!isUnlocked) {
      showResult("يجب فتح القفل أولاً", "warning");
      return;
    }

    if (window.confirm('هل أنت متأكد من حذف المفتاح؟ سيتم فقدان جميع البيانات!')) {
      localStorage.removeItem('keynovaLock');
      setLockData({ keyImage: null, keyPassword: null });
      setIsUnlocked(false);
      showResult("تم حذف المفتاح بنجاح", "success");
      setActiveTab('verify');
    }
  };

  // Export key function
  const exportKey = () => {
    if (!isUnlocked || lockData.keyImage === null) {
      showResult("يجب فتح القفل أولاً", "warning");
      return;
    }

    const exportData = {
      image: naturalImages[lockData.keyImage],
      timestamp: new Date().toISOString(),
      version: '2.0'
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'keynova-key-backup.json';
    link.click();

    URL.revokeObjectURL(url);
    showResult("تم تصدير بيانات المفتاح بنجاح", "success");
  };

  // Generate image gallery
  const ImageGallery = ({ 
    selectedImage, 
    onImageSelect, 
    galleryId 
  }: { 
    selectedImage: number | null; 
    onImageSelect: (index: number) => void;
    galleryId: string;
  }) => {
    return (
      <div className="keynova-image-gallery" data-testid={`gallery-${galleryId}`}>
        {naturalImages.map((image, index) => (
          <div
            key={index}
            className={`keynova-image-item ${selectedImage === index ? 'selected' : ''}`}
            onClick={() => onImageSelect(index)}
            data-testid={`image-item-${index}`}
          >
            <img src={image.url} alt={image.name} loading="lazy" />
            <div className="keynova-image-number">{index + 1}</div>
            <div className="keynova-image-name">{image.name}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="keynova-container">
      {/* Header */}
      <header className="keynova-header">
        <div className="keynova-logo" data-testid="logo">
          <i className="fas fa-lock"></i>
        </div>
        <h1 className="keynova-title" data-testid="title">Keynova Lock</h1>
        <p className="keynova-subtitle">قفل بصري آمن باستخدام الصور وكلمة المرور</p>
        <p className="keynova-subtitle">مطور البرنامج م: رأفت عمر</p>
      </header>

      {/* Tabs */}
      <div className="keynova-tabs">
        <button
          className={`keynova-tab-btn ${activeTab === 'verify' ? 'active' : ''}`}
          onClick={() => setActiveTab('verify')}
          data-testid="tab-verify"
        >
          فتح القفل
        </button>
        <button
          className={`keynova-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
          data-testid="tab-settings"
        >
          الإعدادات
        </button>
      </div>

      {/* Verify Tab */}
      {activeTab === 'verify' && (
        <div data-testid="verify-tab-content">
          <div className="keynova-card">
            <div className="keynova-card-header">
              <i className="fas fa-unlock-alt"></i>
              <h3>فتح القفل باستخدام الصورة وكلمة المرور</h3>
            </div>

            <div className="keynova-form-group">
              <label className="keynova-label">اختر الصورة:</label>
              <div className="keynova-gallery-stats">
                <i className="fas fa-images"></i> معرض المناظر الطبيعية - 20 صورة متاحة
              </div>
              <ImageGallery
                selectedImage={selectedVerifyImage}
                onImageSelect={setSelectedVerifyImage}
                galleryId="verify"
              />
            </div>

            <div className="keynova-form-group">
              <label className="keynova-label">كلمة المرور:</label>
              <input
                type="password"
                className="keynova-input"
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                onKeyPress={(e) => e.key === 'Enter' && verifyKey()}
                data-testid="input-verify-password"
              />
            </div>

            <button className="keynova-btn" onClick={verifyKey} data-testid="button-verify">
              <i className="fas fa-check-circle"></i> تحقق من المفتاح
            </button>

            {result && (
              <div className={`keynova-result ${result.type}`} data-testid="result-message">
                {result.message}
              </div>
            )}
          </div>

          <div className="keynova-instructions">
            <h4><i className="fas fa-info-circle"></i> تعليمات هامة</h4>
            <ul>
              <li>اختر نفس الصورة التي تم تعيينها كمفتاح من معرض المناظر الطبيعية</li>
              <li>أدخل كلمة المرور الصحيحة التي تم تعيينها مع الصورة</li>
              <li>تأكد من صحة كلمة المرور والصورة المختارة</li>
              <li>يمكنك التمرير في المعرض لاستعراض جميع الصور المتاحة</li>
            </ul>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div data-testid="settings-tab-content">
          {!isUnlocked ? (
            <div className="keynova-no-key-message" data-testid="no-key-message">
              <i className="fas fa-key"></i>
              <h3>لا يوجد مفتاح قفل محفوظ</h3>
              <p>يرجى فتح القفل أولاً باستخدام مفتاحك الحالي لتعيين مفتاح جديد</p>
            </div>
          ) : (
            <>
              <div className="keynova-card">
                <div className="keynova-card-header">
                  <i className="fas fa-key"></i>
                  <h3>إدارة المفتاح</h3>
                </div>

                <div className="keynova-form-group">
                  <label className="keynova-label">اختر صورة المفتاح:</label>
                  <div className="keynova-gallery-stats">
                    <i className="fas fa-mountain"></i> مجموعة متنوعة من المناظر الطبيعية الجميلة
                  </div>
                  <ImageGallery
                    selectedImage={selectedSettingsImage}
                    onImageSelect={setSelectedSettingsImage}
                    galleryId="settings"
                  />
                </div>

                <div className="keynova-form-group">
                  <label className="keynova-label">كلمة المرور الجديدة:</label>
                  <input
                    type="password"
                    className="keynova-input"
                    value={setKeyPassword}
                    onChange={(e) => setSetKeyPassword(e.target.value)}
                    placeholder="أدخل كلمة مرور قوية"
                    onKeyPress={(e) => e.key === 'Enter' && setNewKey()}
                    data-testid="input-new-password"
                  />
                </div>

                <div className="keynova-action-buttons">
                  <button className="keynova-btn keynova-btn-success" onClick={setNewKey} data-testid="button-save-key">
                    <i className="fas fa-save"></i> حفظ المفتاح
                  </button>
                  <button className="keynova-btn keynova-btn-secondary" onClick={exportKey} data-testid="button-export">
                    <i className="fas fa-download"></i> تصدير المفتاح
                  </button>
                </div>
              </div>

              <div className="keynova-card">
                <div className="keynova-card-header">
                  <i className="fas fa-shield-alt"></i>
                  <h3>إدارة الحماية</h3>
                </div>

                <div className="keynova-action-buttons">
                  <button className="keynova-btn keynova-btn-danger" onClick={resetKey} data-testid="button-reset">
                    <i className="fas fa-trash"></i> حذف المفتاح
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
