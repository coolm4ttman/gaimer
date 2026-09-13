
#include <GaimerAiOrchestration/GaimerAiOrchestrationTypeIds.h>
#include <GaimerAiOrchestrationModuleInterface.h>
#include "GaimerAiOrchestrationEditorSystemComponent.h"
#include <AzToolsFramework/API/PythonLoader.h>

#include <QtGlobal>

void InitGaimerAiOrchestrationResources()
{
    // We must register our Qt resources (.qrc file) since this is being loaded from a separate module (gem)
    Q_INIT_RESOURCE(GaimerAiOrchestration);
}

namespace GaimerAiOrchestration
{
    class GaimerAiOrchestrationEditorModule
        : public GaimerAiOrchestrationModuleInterface
        , public AzToolsFramework::EmbeddedPython::PythonLoader
    {
    public:
        AZ_RTTI(GaimerAiOrchestrationEditorModule, GaimerAiOrchestrationEditorModuleTypeId, GaimerAiOrchestrationModuleInterface);
        AZ_CLASS_ALLOCATOR(GaimerAiOrchestrationEditorModule, AZ::SystemAllocator);

        GaimerAiOrchestrationEditorModule()
        {
            InitGaimerAiOrchestrationResources();

            // Push results of [MyComponent]::CreateDescriptor() into m_descriptors here.
            // Add ALL components descriptors associated with this gem to m_descriptors.
            // This will associate the AzTypeInfo information for the components with the the SerializeContext, BehaviorContext and EditContext.
            // This happens through the [MyComponent]::Reflect() function.
            m_descriptors.insert(m_descriptors.end(), {
                GaimerAiOrchestrationEditorSystemComponent::CreateDescriptor(),
            });
        }

        /**
         * Add required SystemComponents to the SystemEntity.
         * Non-SystemComponents should not be added here
         */
        AZ::ComponentTypeList GetRequiredSystemComponents() const override
        {
            return AZ::ComponentTypeList {
                azrtti_typeid<GaimerAiOrchestrationEditorSystemComponent>(),
            };
        }
    };
}// namespace GaimerAiOrchestration

#if defined(O3DE_GEM_NAME)
AZ_DECLARE_MODULE_CLASS(AZ_JOIN(Gem_, O3DE_GEM_NAME, _Editor), GaimerAiOrchestration::GaimerAiOrchestrationEditorModule)
#else
AZ_DECLARE_MODULE_CLASS(Gem_GaimerAiOrchestration_Editor, GaimerAiOrchestration::GaimerAiOrchestrationEditorModule)
#endif
