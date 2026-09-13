
#include "GaimerAiOrchestrationModuleInterface.h"
#include <AzCore/Memory/Memory.h>

#include <GaimerAiOrchestration/GaimerAiOrchestrationTypeIds.h>

namespace GaimerAiOrchestration
{
    AZ_TYPE_INFO_WITH_NAME_IMPL(GaimerAiOrchestrationModuleInterface,
        "GaimerAiOrchestrationModuleInterface", GaimerAiOrchestrationModuleInterfaceTypeId);
    AZ_RTTI_NO_TYPE_INFO_IMPL(GaimerAiOrchestrationModuleInterface, AZ::Module);
    AZ_CLASS_ALLOCATOR_IMPL(GaimerAiOrchestrationModuleInterface, AZ::SystemAllocator);

    GaimerAiOrchestrationModuleInterface::GaimerAiOrchestrationModuleInterface()
    {
    }

    AZ::ComponentTypeList GaimerAiOrchestrationModuleInterface::GetRequiredSystemComponents() const
    {
        return AZ::ComponentTypeList{
        };
    }
} // namespace GaimerAiOrchestration
