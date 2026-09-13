
#pragma once

#include <AzCore/Component/Component.h>

#include <GaimerSandbox/GaimerSandboxBus.h>

namespace GaimerSandbox
{
    class GaimerSandboxSystemComponent
        : public AZ::Component
        , protected GaimerSandboxRequestBus::Handler
    {
    public:
        AZ_COMPONENT_DECL(GaimerSandboxSystemComponent);

        static void Reflect(AZ::ReflectContext* context);

        static void GetProvidedServices(AZ::ComponentDescriptor::DependencyArrayType& provided);
        static void GetIncompatibleServices(AZ::ComponentDescriptor::DependencyArrayType& incompatible);
        static void GetRequiredServices(AZ::ComponentDescriptor::DependencyArrayType& required);
        static void GetDependentServices(AZ::ComponentDescriptor::DependencyArrayType& dependent);

        GaimerSandboxSystemComponent();
        ~GaimerSandboxSystemComponent();

    protected:
        ////////////////////////////////////////////////////////////////////////
        // GaimerSandboxRequestBus interface implementation

        ////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////
        // AZ::Component interface implementation
        void Init() override;
        void Activate() override;
        void Deactivate() override;
        ////////////////////////////////////////////////////////////////////////
    };
}
