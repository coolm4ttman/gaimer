
#include <AzCore/Memory/SystemAllocator.h>
#include <AzCore/Module/Module.h>

#include "GaimerSandboxSystemComponent.h"

#include <GaimerSandbox/GaimerSandboxTypeIds.h>

namespace GaimerSandbox
{
    class GaimerSandboxModule
        : public AZ::Module
    {
    public:
        AZ_RTTI(GaimerSandboxModule, GaimerSandboxModuleTypeId, AZ::Module);
        AZ_CLASS_ALLOCATOR(GaimerSandboxModule, AZ::SystemAllocator);

        GaimerSandboxModule()
            : AZ::Module()
        {
            // Push results of [MyComponent]::CreateDescriptor() into m_descriptors here.
            m_descriptors.insert(m_descriptors.end(), {
                GaimerSandboxSystemComponent::CreateDescriptor(),
            });
        }

        /**
         * Add required SystemComponents to the SystemEntity.
         */
        AZ::ComponentTypeList GetRequiredSystemComponents() const override
        {
            return AZ::ComponentTypeList{
                azrtti_typeid<GaimerSandboxSystemComponent>(),
            };
        }
    };
}// namespace GaimerSandbox

#if defined(O3DE_GEM_NAME)
AZ_DECLARE_MODULE_CLASS(AZ_JOIN(Gem_, O3DE_GEM_NAME), GaimerSandbox::GaimerSandboxModule)
#else
AZ_DECLARE_MODULE_CLASS(Gem_GaimerSandbox, GaimerSandbox::GaimerSandboxModule)
#endif
