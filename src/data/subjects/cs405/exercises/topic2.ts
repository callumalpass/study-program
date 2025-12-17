import { CodingExercise } from '../../../../core/types';

const topic2Exercises: CodingExercise[] = [
  {
    id: 'cs405-ex-2-1',
    subjectId: 'cs405',
    topicId: 'cs405-topic-2',
    title: 'Create and Configure Virtual Machines',
    difficulty: 2,
    description: `Create a script that uses the VirtualBox CLI (VBoxManage) or libvirt/virsh to:

1. Create a new virtual machine with specified resources
2. Configure network settings (bridged and NAT)
3. Attach a virtual disk
4. List all configured VMs and their states

Requirements:
- VM should have 2GB RAM and 2 vCPUs
- Create a 20GB virtual disk
- Configure both bridged and NAT network adapters
- Output VM configuration details`,
    starterCode: `#!/bin/bash
# VM Management Script

VM_NAME="test-vm"
# TODO: Define VM parameters

# Function to create VM
create_vm() {
    # TODO: Implement VM creation
    echo "Creating VM..."
}

# Function to configure networking
configure_network() {
    # TODO: Configure network adapters
    echo "Configuring network..."
}

# Function to attach storage
attach_storage() {
    # TODO: Create and attach virtual disk
    echo "Attaching storage..."
}

# Function to list VMs
list_vms() {
    # TODO: List all VMs and their status
    echo "Listing VMs..."
}

# Main execution
create_vm
configure_network
attach_storage
list_vms`,
    solution: `#!/bin/bash
# Complete VM Management Script using VirtualBox

VM_NAME="test-vm"
VM_RAM=2048  # MB
VM_CPUS=2
DISK_SIZE=20480  # MB
OSTYPE="Ubuntu_64"

# Function to create VM
create_vm() {
    echo "Creating VM: $VM_NAME"

    # Create VM
    VBoxManage createvm --name "$VM_NAME" --ostype "$OSTYPE" --register

    # Configure resources
    VBoxManage modifyvm "$VM_NAME" \\
        --memory $VM_RAM \\
        --cpus $VM_CPUS \\
        --vram 128 \\
        --boot1 dvd \\
        --boot2 disk \\
        --boot3 none \\
        --boot4 none

    echo "VM created successfully"
}

# Function to configure networking
configure_network() {
    echo "Configuring network adapters..."

    # NAT adapter (adapter 1)
    VBoxManage modifyvm "$VM_NAME" \\
        --nic1 nat \\
        --nictype1 82540EM \\
        --cableconnected1 on

    # Bridged adapter (adapter 2)
    VBoxManage modifyvm "$VM_NAME" \\
        --nic2 bridged \\
        --bridgeadapter2 eth0 \\
        --nictype2 82540EM \\
        --cableconnected2 on

    echo "Network configured: NAT + Bridged"
}

# Function to attach storage
attach_storage() {
    echo "Creating and attaching virtual disk..."

    # Create storage controller
    VBoxManage storagectl "$VM_NAME" \\
        --name "SATA Controller" \\
        --add sata \\
        --controller IntelAhci

    # Create virtual disk
    DISK_PATH="$HOME/VirtualBox VMs/$VM_NAME/$VM_NAME.vdi"
    VBoxManage createhd \\
        --filename "$DISK_PATH" \\
        --size $DISK_SIZE \\
        --format VDI

    # Attach disk to VM
    VBoxManage storageattach "$VM_NAME" \\
        --storagectl "SATA Controller" \\
        --port 0 \\
        --device 0 \\
        --type hdd \\
        --medium "$DISK_PATH"

    echo "Storage attached: \${DISK_SIZE}MB disk"
}

# Function to list VMs
list_vms() {
    echo "\\n=== Virtual Machines ==="
    VBoxManage list vms

    echo "\\n=== Running VMs ==="
    VBoxManage list runningvms

    echo "\\n=== VM Details: $VM_NAME ==="
    VBoxManage showvminfo "$VM_NAME" --machinereadable | grep -E "(memory|cpus|nic)"
}

# Main execution
echo "Starting VM setup..."
create_vm
configure_network
attach_storage
list_vms

echo "\\nVM setup complete!"
echo "To start the VM: VBoxManage startvm $VM_NAME --type headless"
echo "To stop the VM: VBoxManage controlvm $VM_NAME poweroff"`,
    hints: [
      'Use VBoxManage or virsh for VM operations',
      'Configure networking before starting the VM',
      'Check VM state with list commands',
      'Use --machinereadable for parseable output'
    ],
    testCases: [
      {
        input: 'create_vm',
        expectedOutput: 'VM created with 2GB RAM, 2 vCPUs',
        isHidden: false,
        description: 'Create VM with specified resources'
      },
      {
        input: 'configure_network',
        expectedOutput: 'NAT and Bridged adapters configured',
        isHidden: false,
        description: 'Configure network adapters'
      },
      {
        input: 'attach_storage',
        expectedOutput: '20GB VDI disk attached via SATA',
        isHidden: false,
        description: 'Attach virtual storage'
      }
    ],
    language: 'bash'
  },
  {
    id: 'cs405-ex-2-2',
    subjectId: 'cs405',
    topicId: 'cs405-topic-2',
    title: 'VM Snapshots and Cloning',
    difficulty: 3,
    description: `Create a script that demonstrates VM snapshot and cloning capabilities:

1. Create a snapshot of an existing VM
2. Restore from a snapshot
3. Create a full clone of a VM
4. Create a linked clone
5. List all snapshots

Include error handling and validation.`,
    starterCode: `#!/bin/bash
# VM Snapshot and Clone Manager

VM_NAME="test-vm"

create_snapshot() {
    # TODO: Create snapshot
    echo "Creating snapshot..."
}

restore_snapshot() {
    # TODO: Restore from snapshot
    echo "Restoring snapshot..."
}

clone_vm() {
    # TODO: Clone VM
    echo "Cloning VM..."
}`,
    solution: `#!/bin/bash
# Complete VM Snapshot and Clone Manager

VM_NAME="test-vm"

# Colors for output
RED='\\033[0;31m'
GREEN='\\033[0;32m'
NC='\\033[0m' # No Color

# Error handling
set -e
trap 'echo "\${RED}Error occurred. Exiting...\${NC}"' ERR

# Check if VM exists
check_vm_exists() {
    if ! VBoxManage list vms | grep -q "$1"; then
        echo "\${RED}VM $1 does not exist\${NC}"
        return 1
    fi
    return 0
}

# Create snapshot
create_snapshot() {
    local vm_name=$1
    local snapshot_name=$2

    echo "Creating snapshot: $snapshot_name for VM: $vm_name"

    if ! check_vm_exists "$vm_name"; then
        return 1
    fi

    VBoxManage snapshot "$vm_name" take "$snapshot_name" \\
        --description "Snapshot created on $(date)" \\
        --live  # Live snapshot if VM is running

    echo "\${GREEN}Snapshot created successfully\${NC}"
}

# List snapshots
list_snapshots() {
    local vm_name=$1

    echo "Snapshots for VM: $vm_name"

    if ! check_vm_exists "$vm_name"; then
        return 1
    fi

    VBoxManage snapshot "$vm_name" list --details
}

# Restore snapshot
restore_snapshot() {
    local vm_name=$1
    local snapshot_name=$2

    echo "Restoring snapshot: $snapshot_name"

    if ! check_vm_exists "$vm_name"; then
        return 1
    fi

    # Power off VM if running
    if VBoxManage list runningvms | grep -q "$vm_name"; then
        echo "Powering off VM..."
        VBoxManage controlvm "$vm_name" poweroff
        sleep 2
    fi

    VBoxManage snapshot "$vm_name" restore "$snapshot_name"

    echo "\${GREEN}Snapshot restored successfully\${NC}"
}

# Delete snapshot
delete_snapshot() {
    local vm_name=$1
    local snapshot_name=$2

    echo "Deleting snapshot: $snapshot_name"

    VBoxManage snapshot "$vm_name" delete "$snapshot_name"

    echo "\${GREEN}Snapshot deleted\${NC}"
}

# Create full clone
create_full_clone() {
    local source_vm=$1
    local clone_name=$2

    echo "Creating full clone: $clone_name from $source_vm"

    if ! check_vm_exists "$source_vm"; then
        return 1
    fi

    VBoxManage clonevm "$source_vm" \\
        --name "$clone_name" \\
        --mode machine \\
        --options link \\
        --register

    echo "\${GREEN}Full clone created: $clone_name\${NC}"
}

# Create linked clone from snapshot
create_linked_clone() {
    local source_vm=$1
    local snapshot_name=$2
    local clone_name=$3

    echo "Creating linked clone: $clone_name"

    if ! check_vm_exists "$source_vm"; then
        return 1
    fi

    VBoxManage clonevm "$source_vm" \\
        --snapshot "$snapshot_name" \\
        --name "$clone_name" \\
        --options link \\
        --register

    echo "\${GREEN}Linked clone created: $clone_name\${NC}"
}

# Demo workflow
demo_workflow() {
    echo "=== VM Snapshot and Clone Demo ==="

    # Create snapshots
    create_snapshot "$VM_NAME" "clean-install"
    create_snapshot "$VM_NAME" "after-updates"

    # List all snapshots
    list_snapshots "$VM_NAME"

    # Create full clone
    create_full_clone "$VM_NAME" "\${VM_NAME}-clone-full"

    # Create linked clone
    create_linked_clone "$VM_NAME" "clean-install" "\${VM_NAME}-clone-linked"

    # Restore to earlier snapshot
    restore_snapshot "$VM_NAME" "clean-install"

    echo "\${GREEN}Demo complete!\${NC}"
}

# Main execution
case "\${1:-demo}" in
    create-snapshot)
        create_snapshot "$2" "$3"
        ;;
    list-snapshots)
        list_snapshots "$2"
        ;;
    restore-snapshot)
        restore_snapshot "$2" "$3"
        ;;
    delete-snapshot)
        delete_snapshot "$2" "$3"
        ;;
    clone-full)
        create_full_clone "$2" "$3"
        ;;
    clone-linked)
        create_linked_clone "$2" "$3" "$4"
        ;;
    demo)
        demo_workflow
        ;;
    *)
        echo "Usage: $0 {create-snapshot|list-snapshots|restore-snapshot|clone-full|clone-linked|demo} [args]"
        exit 1
        ;;
esac`,
    hints: [
      'Power off VM before restoring snapshots',
      'Use --live for snapshots of running VMs',
      'Linked clones save disk space',
      'Full clones are independent',
      'Always validate VM exists before operations'
    ],
    testCases: [
      {
        input: 'create_snapshot test-vm snapshot-1',
        expectedOutput: 'Snapshot created with timestamp',
        isHidden: false,
        description: 'Create a snapshot of a VM'
      },
      {
        input: 'list_snapshots test-vm',
        expectedOutput: 'All snapshots listed with details',
        isHidden: false,
        description: 'List all snapshots for a VM'
      },
      {
        input: 'create_full_clone test-vm clone-1',
        expectedOutput: 'Independent clone created and registered',
        isHidden: false,
        description: 'Create a full clone of the VM'
      }
    ],
    language: 'bash'
  }
];

export { topic2Exercises };